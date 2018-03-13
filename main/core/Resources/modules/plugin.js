
const CORE_PLUGIN = 'CORE_PLUGIN'

const coreConfiguration = {
  actions: [],
  resources: [],
  tools: [],
  widgets: [
    {
      name: 'simple',
      meta: {
        icon: 'fa fa-fw fa-pencil',
        description: ''
      },
      context: ['desktop', 'workspace'],
      load: () => {
        // We need to explicitly declare it to be grabbed in the webpack compilation
        // Without it the chunk is not generated
        return import(/* webpackChunkName: "simple-widget" */ '#/main/core/widgets/simple')
      }
    }, {
      name: 'profile',
      meta: {
        icon: 'fa fa-fw fa-user-circle-o',
        description: ''
      },
      context: ['desktop', 'workspace']
    }, {
      name: 'list',
      meta: {
        icon: 'fa fa-fw fa-list',
        description: ''
      },
      context: ['desktop', 'workspace'],
      load: () => {
        // We need to explicitly declare it to be grabbed in the webpack compilation
        // Without it the chunk is not generated
        return import(/* webpackChunkName: "list-widget" */ '#/main/core/widgets/list')
      }
    }
  ],
  widgetSources: [
    {
      name: 'resource',
      widget: ''
    }
  ]
}

export {
  CORE_PLUGIN,
  coreConfiguration
}
