import React from 'react'

import {PropTypes as T, implementPropTypes} from '#/main/core/scaffolding/prop-types'
import {DataSearch as DataSearchTypes} from '#/main/core/data/prop-types'
import {Select} from '#/main/core/layout/select-plus/components/select.jsx'

const EnumPlusSearch = (props) =>
    <Select
      className="enum-filter"
      choices={props.choices}
      onChange={props.updateSearch}
      transDomain={props.transDomain}
      value={props.search}
    />

implementPropTypes(EnumPlusSearch, DataSearchTypes, {
  choices: T.array.isRequired,
  transDomain: T.string
}, {
  transDomain: null
})

export {
  EnumPlusSearch
}
