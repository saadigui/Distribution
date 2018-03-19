export const actions = {}

actions.load = (file) => {
    return {
      [API_REQUEST]: {
        url: ['apiv2_logger_get', {name: file}],
        success: (response, dispatch) => dispatch(alert('loaded'))
      }
    }
}
