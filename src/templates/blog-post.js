import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import { PDFExport } from '@progress/kendo-react-pdf'
import Wrapper from './../components/epub/wrapper'
import Section from './../components/epub/section'
import FrontMatter from './../components/epub/FrontMatter'
import BackMatter from './../components/epub/BackMatter'
import {transform, h} from 'html-ast-transform'
import showdown from 'showdown'

export function BlogPostTemplate({
  content,
  contentComponent,
  description,
  author,
  authorbio,
  tags,
  title,
  helmet,
  date,
}) {
  const PostContent = contentComponent || Content
  const pdfRef = useRef()
  const epubCreator = useRef()

  const exportPDF = () => {
    pdfRef.current.save();
  }
  const _generateEbook = () => {
    epubCreator.current.createEpub();
  }

  const properties = {
    uuid: 'some',
    author: author,
    language: 'fi-FI',
    modificationDate: new Date().toDateString(),
    rights: { description: '', license: '' },
    attributionurl: '',
    cover: {
      file: 'https://i.imgur.com/e4Stm6J.jpg',
      license: '',
      mediaType: 'image/jpeg',
      attributionUrl: '',
      inline: 'no',
    },
    title: title,
    publicationDate: new Date(2019, 1, 10).toDateString(),
  }

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-12">
            <section className="section">
              <Link to="/tekstit">
                <button className="button">&larr; Takaisin teksteihin</button>
              </Link>
              <button className="button" onClick={exportPDF}>Lataa PDF</button>
              <button className="button" onClick={_generateEbook}>Lataa Epub</button>
            </section>
            <Wrapper ref={epubCreator} properties={properties}>
              <PDFExport 
                ref={pdfRef} 
                paperSize="A4"
                fileName={title + ".pdf"}
                title={title + ".pdf"}
                subject={title + ".pdf"}
                margin="6mm"
              >
                <FrontMatter name="title">
                  <h1 className="title is-size-1 has-text-weight-bold is-bold">
                    {title}
                  </h1>
                  <p>
                    <em>kirjoittanut {author} — {date}</em>
                  </p>
                </FrontMatter>
                <Section name={title}>
                  <PostContent content={content} />
                </Section>
                <BackMatter>
                  <div>
                    <h3 className="title is-size-3 has-text-weight-bold is-bold">
                      Kirjoittajista
                    </h3>
                    {authorbio}
                  </div>
                </BackMatter>
              </PDFExport>
            </Wrapper>

            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Avainsanat</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  author: PropTypes.string,
  authorbio: PropTypes.object,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data

  const content = post.html

  //takes out all the <hr> elements because unclosed elements are not valid for xml 1.1 and epubs use that
  const output = transform(content, {
    replaceTags: {
      hr: node => h('div')
    }
  })

  const converter = new showdown.Converter()

  const AuthorHTML = (content) => (
    <div className='author' dangerouslySetInnerHTML={{ __html: converter.makeHtml(content) }}></div>
  )

  return (
    <Layout>
      <BlogPostTemplate
        content={output}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        author={post.frontmatter.author}
        authorbio={AuthorHTML(post.frontmatter.authorbio)}
        date={post.frontmatter.date}
        helmet={
          <Helmet titleTemplate="%s | Tekstit">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "DD.MM.YYYY")
        title
        author
        authorbio
        description
        tags
      }
    }
  }
`
