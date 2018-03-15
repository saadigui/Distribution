import merge from 'lodash/merge'

import {trans} from '#/main/core/translation'
import {url} from '#/main/core/api/router'

import {App as ListApp} from '#/main/core/widget/types/list'
import {ResourceCard} from '#/main/core/resource/components/card'

/**
 * Resource list widget application (implements list widget).
 *
 * @param context
 * @param parameters
 * @constructor
 */
const App = (context, parameters) => ListApp(context, merge({}, parameters, {
  fetchUrl: ['apiv2_widget_resource_list_desktop'], // todo manage WS

  // todo manage directories
  open: (rowData) => url(['claro_resource_open', {node: rowData.id, resourceType: rowData.meta.type}]),
  definition: [
    {
      name: 'name',
      label: trans('name'),
      displayed: true,
      primary: true
    }, {
      name: 'meta.created',
      label: trans('creation_date'),
      type: 'date',
      alias: 'creationDate',
      displayed: true,
      filterable: false
    }
  ],
  card: ResourceCard
}))

export {
  App
}
