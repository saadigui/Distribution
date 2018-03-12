import React, {Component} from 'react'
import {PropTypes as T} from 'prop-types'

import {platformConfig} from '#/main/core/platform'

/**
 * Mounts an entire React application (components + store) inside another.
 *
 * For instance it's not possible for the 2 apps to communicate.
 */
class EmbeddedApp extends Component {
  componentDidMount() {
    const assets = platformConfig('webpack')

    if (assets && assets[this.props.entry]) {
      // Load application source code
      import(''+assets[this.props.entry]['js']).then(module => {
        console.log(module)

      }).catch(error => 'An error occurred while loading the component')
    } else {
      throw new Error(`Can not find source file for entry "${this.props.entry}".`)
    }
  }

  render() {
    return (
      <div className={`${this.props.name}-container`} />
    )
  }
}


EmbeddedApp.propTypes = {
  /**
   * The name of the app.
   */
  name: T.string.isRequired,
  entry: T.string.isRequired,
  styles: T.string
}

export {
  EmbeddedApp
}
