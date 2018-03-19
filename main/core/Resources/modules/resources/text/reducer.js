import {makeResourceReducer} from '#/main/core/resource/reducer'

import {reducer as editorReducer} from '#/main/core/resources/text/editor/reducer'

const reducer = makeResourceReducer({}, {
  text: editorReducer.text
})

export {
  reducer
}