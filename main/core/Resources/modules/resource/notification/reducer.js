import {makeReducer} from '#/main/core/scaffolding/reducer'

import {RESOURCE_NOTIFICATION_UPDATE} from '#/main/core/resource/notification/actions'

const reducer = makeReducer(null, {
  [RESOURCE_NOTIFICATION_UPDATE]: (state, action) => action.value
})

export {
  reducer
}
