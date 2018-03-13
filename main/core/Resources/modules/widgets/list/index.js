import {makeListReducer} from '#/main/core/data/list/reducer'

import {ListWidget} from '#/main/core/widgets/list/components/widget'

/**
 * List widget application.
 *
 * @param {object} widgetInstance - the current widget instance
 * @param {object} context        - the context of widget rendering
 *
 * @constructor
 */
export const Widget = (widgetInstance, context) => ({
  name: 'list-widget',
  component: ListWidget,
  styles: '',
  store: {
    list: makeListReducer('list', {}, {}, {
      filterable: widgetInstance.parameters.filterable,
      sortable: widgetInstance.parameters.sortable,
      paginated: widgetInstance.parameters.paginated
    })
  },
  initialState: () => ({ // function is for retro compatibility with bootstrap
    list: {
      pageSize: widgetInstance.parameters.pageSize
    }
  })
})
