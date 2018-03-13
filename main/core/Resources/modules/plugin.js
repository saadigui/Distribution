
const CORE_PLUGIN = 'CORE_PLUGIN'

const coreConfiguration = {
  actions: [],
  resources: [],
  tools: [],
  widgets: [
    {
      name: 'simple',
      load: () => {
        // We need to explicitly declare it to be grabbed in the webpack compilation
        // Without it the chunk is not generated
        return import(/* webpackChunkName: "simple-widget" */ '#/main/core/widget/types/simple')
      }
    }, {
      name: 'list',
      load: () => {
        // We need to explicitly declare it to be grabbed in the webpack compilation
        // Without it the chunk is not generated
        return import(/* webpackChunkName: "list-widget" */ '#/main/core/widget/types/list')
      }
    }
  ],
  widgetPresets: [
    {
      name: 'resource-list',
      widget: 'list',
      load: () => {
        // We need to explicitly declare it to be grabbed in the webpack compilation
        // Without it the chunk is not generated
        return import(/* webpackChunkName: "resource-list-preset" */ '#/main/core/widget/presets/list/resource')
      }
    }, {
      name: 'user-list',
      widget: 'list',
      load: () => {
        // We need to explicitly declare it to be grabbed in the webpack compilation
        // Without it the chunk is not generated
        return import(/* webpackChunkName: "user-list-preset" */ '#/main/core/widget/presets/list/user')
      }
    }
  ]
}

export {
  CORE_PLUGIN,
  coreConfiguration
}
