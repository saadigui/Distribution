import React from 'react'
import {PropTypes as T} from 'prop-types'
import {connect} from 'react-redux'

import {DataListContainer} from '#/main/core/data/list/containers/data-list'

const ListWidgetComponent = props =>
  <DataListContainer
    name="list"
    fetch={{
      url: props.fetchUrl,
      autoload: true
    }}
    open={{
      action: props.open
    }}
    definition={props.definition}
    card={props.card}
  />

ListWidgetComponent.propTypes = {
  open: T.func,
  fetchUrl: T.oneOfType([T.string, T.array]).isRequired,
  definition: T.arrayOf(T.shape({
    // todo standard list definition
  })).isRequired,
  card: T.func.isRequired
}

const ListWidget = connect(
  (state) => ({
    fetchUrl: state.config.fetchUrl,
    open: state.config.open,
    definition: state.config.definition,
    card: state.config.card
  })
)(ListWidgetComponent)

export {
  ListWidget
}
