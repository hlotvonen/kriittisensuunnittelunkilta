import React from 'react'
import PropTypes from 'prop-types'

const Sanasto = ({ data }) => (
  <div className="columns">
    {data.map(sana => (
      <div key={sana.term} className="column">
        <section className="section">
          <h4 className="has-text-weight-semibold">
            {sana.term}
          </h4>
          <p>{sana.description}</p>
          <a href={sana.url}><button className="button">Lue lisää aiheesta &rarr;</button></a>
        </section>
      </div>
    ))}
  </div>
)

Sanasto.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      term: PropTypes.string,
      url: PropTypes.string,
      description: PropTypes.string,
    })
  ),
}

export default Sanasto
