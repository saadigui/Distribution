
import {coreConfiguration} from '#/main/core/plugin'

function getWidget(name) {
  const widget = coreConfiguration.widgets.find(widget => widget.name === name)
  if (widget) {
    widget
      .app()
      .then(module => {
        console.log(module)
      })
      .catch(error => 'An error occurred while loading the component')
  } else {

  }
  /*import(/!* webpackChunkName: "simple-widget" *!/ '#/main/core/widgets/simple').then(module => {
    console.log(module)

  }).catch(error => 'An error occurred while loading the component')*/
}

export {
  getWidget
}
