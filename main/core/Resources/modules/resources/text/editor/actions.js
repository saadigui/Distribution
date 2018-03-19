import {makeActionCreator} from '#/main/core/scaffolding/actions'
import {API_REQUEST} from '#/main/core/api/actions'
import {generateUrl} from '#/main/core/api/router'

const TEXT_UPDATE = 'TEXT_UPDATE'

const actions = {}

actions.saveText = (text) => (dispatch) => {
  // if (track.autoId) {
  //   dispatch({
  //     [API_REQUEST]: {
  //       url: generateUrl('apiv2_videotrack_update', {id: track.id}),
  //       request: {
  //         method: 'PUT',
  //         body: JSON.stringify(track)
  //       },
  //       success: (data, dispatch) => {
  //         dispatch(actions.updateSubtitle(data))
  //       }
  //     }
  //   })
  // } else {
  //   const formData = new FormData()
  //   formData.append('track', JSON.stringify(track))
  //   formData.append('file', track.file)
  //
  //   dispatch({
  //     [API_REQUEST]: {
  //       url: generateUrl('apiv2_videotrack_create'),
  //       request: {
  //         method: 'POST',
  //         body: formData
  //       },
  //       success: (data, dispatch) => {
  //         dispatch(actions.addSubtitle(data))
  //       }
  //     }
  //   })
  // }
}

actions.updateText = makeActionCreator(TEXT_UPDATE, 'text')

export {
  actions,
  TEXT_UPDATE
}