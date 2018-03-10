import React, {Component} from 'react'
import {PropTypes as T} from 'prop-types'

/**
 * Mounts an entire React application (components + store) inside another.
 *
 * For instance it's not possible for the 2 apps to communicate.
 */
class EmbeddedApp extends Component {
  componentDidMount() {
    // Load application source code
    import(''+this.props.path).then(module => {
      console.log(module)

    }).catch(error => 'An error occurred while loading the component')
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
  path: T.string.isRequired,
  styles: T.string
}

export {
  EmbeddedApp
}
