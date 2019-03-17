import React from 'react';

const Section = (props) => {
  return (
    <section
      style={{ ...props.styles }}
      className="section"
      id="section"
      data-chapter-label={props.name}>
      {props.children}
    </section>
  );
};

export default Section;
