import React from 'react';

const BackMatter = props => {
  return (
    <section
      style={{ ...props.style }}
      id="backmatter"
      data-chapter-label={props.name}>
      {props.children}
    </section>
  );
};

export default BackMatter;
