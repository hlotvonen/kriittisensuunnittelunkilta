import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import Sanasto from '../components/Sanasto'
import Linkkilista from '../components/Linkkilista'
import Lukulista from '../components/Lukulista'

export const TietopankkiPageTemplate = ({
  title,
  lukulista,
  linkkilista,
  sanasto,
  content, 
  contentComponent,
}) =>{ 
  const PageContent = contentComponent || Content

  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-12">
              <div className="content">
                  <h2 className="has-text-weight-bold is-size-1">
                    {title}
                  </h2>
                  <PageContent className="content" content={content} />
                  <div id="sanasto">
                    <h2>{sanasto.heading}</h2>
                    <Sanasto data={sanasto.list} />
                  </div>
                  <div id="linkkilista">
                    <h2>{linkkilista.heading}</h2>
                    <Linkkilista data={linkkilista.list} />
                  </div>
                  <div id="lukulista">
                    <h2>{lukulista.heading}</h2>
                    <Lukulista data={lukulista.list} />
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
 )
}


TietopankkiPageTemplate.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  sanasto: PropTypes.shape({
    heading: PropTypes.string,
    list: PropTypes.array,
  }),
}

const TietopankkiPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <TietopankkiPageTemplate
        title={post.frontmatter.title}
        sanasto={post.frontmatter.sanasto}
        lukulista={post.frontmatter.lukulista}
        linkkilista={post.frontmatter.linkkilista}
        content={post.html}
        contentComponent={HTMLContent}
      />
    </Layout>
  )
}

TietopankkiPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default TietopankkiPage

export const tietopankkiPageQuery = graphql`
  query TietopankkiPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        lukulista {
          heading
          description
          list {
            title
            author
            description
            link
          }
        }
        linkkilista {
          heading
          list {
            title
            url
            description
          }
        }
        sanasto {
          heading
          list {
            term
            url
            description
          }
        }
      }
    }
  }
`
