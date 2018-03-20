import {API_REQUEST} from '#/main/core/api/actions'
import {makeActionCreator} from '#/main/core/scaffolding/actions'

export const RESOURCE_NOTIFICATION_UPDATE  = 'RESOURCE_NOTIFICATION_UPDATE'

export const actions = {}

actions.changeResourceNotification = (id, resourceClass, value) => {
  const url = value ? 'icap_notification_resource_enable' : 'icap_notification_resource_disable'

  return {
    [API_REQUEST]: {
      url: [url, {
        resourceId: id,
        resourceClass: window.btoa(resourceClass)
      }],
      request: {
        method: 'PUT'
      },
      success: (data, dispatch) => dispatch(actions.updateResourceNotification(value))
    }
  }
}

actions.updateResourceNotification = makeActionCreator(RESOURCE_NOTIFICATION_UPDATE, 'value')