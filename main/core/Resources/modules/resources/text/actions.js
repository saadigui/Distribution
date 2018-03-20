import {API_REQUEST} from '#/main/core/api/actions'
import {makeActionCreator} from '#/main/core/scaffolding/actions'

export const NOTIFY_TOGGLE  = 'NOTIFY_TOGGLE'

export const actions = {}

actions.toggleNotification = (id, value) => {
  const url = value ? 'icap_notification_resource_enable' : 'icap_notification_resource_disable'

  return {
    [API_REQUEST]: {
      url: [url, {
        resourceId: id,
        resourceClass: window.btoa('Claroline\\CoreBundle\\Entity\\Resource\\Text')
      }],
      request: {
        method: 'PUT'
      },
      success: (data, dispatch) => dispatch(actions.toggleNotify(value))
    }
  }
}

actions.toggleNotify = makeActionCreator(NOTIFY_TOGGLE, 'value')
