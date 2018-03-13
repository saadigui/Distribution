import {bootstrap} from '#/main/core/scaffolding/bootstrap'

import {SimpleWidget} from '#/main/core/widget/types/simple/components/widget'

console.log('SimpleWidget')

/**
 * Simple widget application.
 *
 * @param {object} widgetInstance - the current widget instance
 * @param {object} context        - the context of widget rendering
 *
 * @constructor
 */
export const App = (widgetInstance, context) => ({
  name: 'simple-widget',
  component: SimpleWidget
})
