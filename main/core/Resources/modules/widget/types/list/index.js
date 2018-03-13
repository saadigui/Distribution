import {makeReducer} from '#/main/core/scaffolding/reducer'
import {makeListReducer} from '#/main/core/data/list/reducer'

import {ListWidget} from '#/main/core/widget/types/list/components/widget'

/**
 * List widget application.
 *
 * @param {object} widgetInstance - the current widget instance
 * @param {object} context        - the context of widget rendering
 *
 * @constructor
 */
export const App = (widgetInstance, context) => ({
  name: 'list-widget',
  component: ListWidget,
  store: {
    context: makeReducer({}, {}),
    config: makeReducer({}, {}),
    list: makeListReducer('list', {}, {}, {
      filterable: widgetInstance.parameters.filterable,
      sortable: widgetInstance.parameters.sortable,
      paginated: widgetInstance.parameters.paginated
    })
  },
  initialState: () => ({ // function is for retro compatibility with bootstrap
    context: context,
    config: widgetInstance.parameters,
    list: {
      pageSize: widgetInstance.parameters.pageSize
    }
  })
})
