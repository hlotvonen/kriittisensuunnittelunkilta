import React from 'react';

const FrontMatter = props => {
  return (
    <section
      style={{ ...props.style }}
      id="frontmatter"
      className="Center-content Full-page"
      data-chapter-label={props.name}>
      {props.children}
    </section>
  );
};

export default FrontMatter;
