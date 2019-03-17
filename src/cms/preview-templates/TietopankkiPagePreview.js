import React from 'react'
import PropTypes from 'prop-types'
import { TietopankkiPageTemplate } from '../../templates/tietopankki-page'

const TietopankkiPagePreview = ({ entry, getAsset }) => {
  const entryBlurbs = entry.getIn(['data', 'intro', 'blurbs'])
  const blurbs = entryBlurbs ? entryBlurbs.toJS() : []

  const entryLukulista = entry.getIn(['data', 'lukulista'])
  const lukulista = entryLukulista ? entryLukulista.toJS() : []

  const entryLinkkilista = entry.getIn(['data', 'linkkilista'])
  const linkkilista = entryLinkkilista ? entryLinkkilista.toJS() : []

  const entrySanasto = entry.getIn(['data', 'sanasto'])
  const sanasto = entrySanasto ? entrySanasto.toJS() : []

  return (
    <TietopankkiPageTemplate
      title={entry.getIn(['data', 'title'])}
      intro={{ blurbs }}
      sanasto={{ sanasto }}
      lukulista={{ lukulista }}
      linkkilista={{ linkkilista }}
    />
  )
}

TietopankkiPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default TietopankkiPagePreview
