import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import * as epub from 'epub-creator';

const Wrapper = forwardRef((props, ref) => {
  let epubRef = useRef(null);

  const htmlToString = html =>
    html.outerHTML.toString().replace(/((<img|<source)("[^"]*"|[^/">])*)>/gi, '$1/>');

  const generateSections = className => {
    const elements = epubRef.current.querySelectorAll(`.${className}`);
    let sections = [];
    elements.forEach(item => {
      sections = [
        ...sections,
        {
          tag: 'section',
          name: item.getAttribute('data-name-section') || 'other',
          content: htmlToString(item),
          navLabel: item.getAttribute('data-chapter-label'),
        },
      ];
    });
    return sections;
  };

  const _createEpub = () => {
    const { properties } = props;
    const frontmatter = epubRef.current.querySelector('#frontmatter');
    const backmatter = epubRef.current.querySelector('#backmatter');
    const epc = new epub.EpubCreator();

    //set the basics properties for epub file
    epc.properties = properties;

    //add the first section like introductions, abstracts, etc...
    epc.addSections([
      {
        tag: 'section',
        name: 'frontmatter',
        content: htmlToString(frontmatter),
        navLabel: frontmatter.getAttribute('data-chapter-label'),
      },
    ]);

    //body of the ebook, inside it has all the content
    epc.addSections([
      {
        tag: 'section',
        name: 'bodymatter',
        content: generateSections('section'),
      },
    ]);

    //add the final pages, it cuild be the references, conslusions, etc...
    epc.addSections([
      {
        tag: 'section',
        name: 'backmatter',
        content: htmlToString(backmatter),
        navLabel: backmatter.getAttribute('data-chapter-label'),
      },
    ]);
    epc.addCss({
      content:
        '* { font-family: serif; } body { margin: 0; padding: 0; } h1, h2, h3, h4, h5, h6, { margin: 0; padding: 0; line-height: "100%"; }',
      name: 'base.css',
    });
    epc.download();
  };

  useImperativeHandle(ref, () => ({
    createEpub() {
      _createEpub();
    },
  }));

  return (
    <main id="epub" ref={epubRef}>
      {props.children}
    </main>
  );
});

export default Wrapper;
