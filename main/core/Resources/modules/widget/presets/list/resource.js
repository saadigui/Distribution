import {trans} from '#/main/core/translation'
import {url} from '#/main/core/api/router'

const WidgetPreset = (context) => ({
  fetchUrl: ['apiv2_widget_resource_list_desktop'],
  open: {
    action: (rowData) => url(['claro_resource_open', {node: rowData.id, resourceType: rowData.meta.type}])
  },
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
  card: () => ({

  })
})

export {
  WidgetPreset
}
