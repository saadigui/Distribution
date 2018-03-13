import {coreConfiguration} from '#/main/core/plugin'

function getWidget(name) {
  const widget = coreConfiguration.widgets.find(widget => widget.name === name)
  if (!widget) {
    throw new Error(`You have requested a non existent widget named ${name}`)
  }

  return widget
}

export {
  getWidget
}
