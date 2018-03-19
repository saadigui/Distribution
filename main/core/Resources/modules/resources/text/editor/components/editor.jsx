import React from 'react'
import {connect} from 'react-redux'
import {PropTypes as T} from 'prop-types'

import {Text as TextTypes} from '#/main/core/resources/text/prop-types'
import {HtmlText} from '#/main/core/layout/components/html-text.jsx'

const EditorComponent = props =>
  <HtmlText>
    Coucou ! Tu es dans l'éditeur.
  </HtmlText>

EditorComponent.propTypes = {
  text: T.shape(TextTypes.propTypes).isRequired
}

const Editor = connect(
  state => ({
    text: state.text
  })
)(EditorComponent)

export {
  Editor
}