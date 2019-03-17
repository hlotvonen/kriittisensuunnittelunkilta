import React from 'react'
import PropTypes from 'prop-types'

const Linkkilista = ({ data }) => (
  <div className="columns">
    {data.map(lista => (
      <div key={lista.title} className="column">
        <section className="section">
          <h4 className="has-text-weight-semibold">
            <a href={lista.url}>{lista.title}</a>
          </h4>
          <p>{lista.description} </p>
        </section>
      </div>
    ))}
  </div>
)

Linkkilista.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      url: PropTypes.string,
    })
  ),
}

export default Linkkilista
