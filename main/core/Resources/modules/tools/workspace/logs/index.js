import {bootstrap} from '#/main/core/scaffolding/bootstrap'

import {LogTool} from '#/main/core/tools/workspace/logs/components/tool.jsx'
import {reducer} from '#/main/core/tools/workspace/logs/reducer'


// mount the react application
bootstrap(
  // app DOM container (also holds initial app data as data attributes)
  '.logs-container',

  // app main component (accepts either a `routedApp` or a `ReactComponent`)
  LogTool,

  // app store configuration
  reducer,
  // initial data
  initialData => ({
    workspaceId: initialData.workspaceId,
    actions: initialData.actions
  })
)
