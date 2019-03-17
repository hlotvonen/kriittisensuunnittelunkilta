import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const FeatureGrid = ({ gridItems }) => (
  <div className="columns is-multiline">
    {gridItems.map(item => (
      <div key={item.text} className="column is-6">
        <section className="section">
          <h3>{item.title}</h3>
          <p>{item.text}</p>
          <Link className="button" to={item.buttonurl}>
            {item.buttontext} →
          </Link>
        </section>
      </div>
    ))}
  </div>
)

FeatureGrid.propTypes = {
  gridItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      text: PropTypes.string,
      buttontext: PropTypes.string,
      buttonurl: PropTypes.string,
    })
  ),
}

export default FeatureGrid
