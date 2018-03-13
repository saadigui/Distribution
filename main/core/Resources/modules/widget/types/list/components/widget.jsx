import React from 'react'
import {PropTypes as T} from 'prop-types'

import {DataListContainer} from '#/main/core/data/list/containers/data-list'

const ListWidget = props =>
  <DataListContainer
    name="list"
    fetch={{}}
  />

ListWidget.propTypes = {
  fetchUrl: T.string.isRequired
}

export {
  ListWidget
}
