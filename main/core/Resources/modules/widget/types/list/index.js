import {makeReducer} from '#/main/core/scaffolding/reducer'
import {makeListReducer} from '#/main/core/data/list/reducer'

import {ListWidget} from '#/main/core/widget/types/list/components/widget'

/**
 * List widget application.
 *
 * @param {object} context    - the context of widget rendering
 * @param {object} parameters - the current widget parameters
 *
 * @constructor
 */
export const App = (context, parameters = {}) => ({
  component: ListWidget,
  store: {
    config: makeReducer({}, {}),
    list: makeListReducer('list', {}, {}, {
      selectable: false,
      filterable: parameters.filterable,
      sortable: parameters.sortable,
      paginated: parameters.paginated
    })
  },
  initialData: () => ({ // function is for retro compatibility with bootstrap()
    config: parameters,
    list: {
      pageSize: parameters.pageSize
    }
  })
})
