import {makeReducer} from '#/main/core/scaffolding/reducer'

import {
  TEXT_UPDATE
} from '#/main/core/resources/text/editor/actions'

const reducer = {
  text: makeReducer({}, {
    [TEXT_UPDATE]: (state, action) => {
      return action.text
    }
  })
}

export {
  reducer
}