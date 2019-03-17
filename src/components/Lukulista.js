import React from 'react'
import PropTypes from 'prop-types'

const Lukulista = ({ data }) => (
  <div className="columns">
    {data.map(lista => (
      <div key={lista.title} className="column">
        <section className="section">
          <h4 className="has-text-weight-semibold">
            {lista.title} — {lista.author}
          </h4>
          <p>{lista.description} {lista.link}</p>
        </section>
      </div>
    ))}
  </div>
)

Lukulista.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      author: PropTypes.string,
      description: PropTypes.string,
      link: PropTypes.string,
    })
  ),
}

export default Lukulista
