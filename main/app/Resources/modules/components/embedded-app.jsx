import React, {Component} from 'react'
import {PropTypes as T} from 'prop-types'
import invariant from 'invariant'

import {bootstrap} from '#/main/core/scaffolding/bootstrap'
import {theme} from '#/main/core/scaffolding/asset'

/**
 * Mounts an entire React application (components + store) inside another.
 *
 * For instance it's not possible for the 2 apps to communicate.
 */
class EmbeddedApp extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    this.props.load()
      .then(module => {
        // generate the application
        const embeddedApp = module.App(...this.props.parameters)
        if (embeddedApp) {
          this.setState(embeddedApp, () => {
            // append and bootstrap the app
            bootstrap(`.${this.state.name}-container`, this.state.component, this.state.store, this.state.initialState)
          })
        }
      })
      .catch(error => {
        invariant(false, `An error occurred while loading the EmbeddedApp : ${error}`)
      })
  }

  render() {
    return (
      <sections className="embedded-app">
        <div className={`${this.state.name}-container`} />

        {this.state.styles && 0 !== this.state.styles.length &&
          <link rel="stylesheet" type="text/css" href={theme(this.state.styles)} />
        }
      </sections>
    )
  }
}


EmbeddedApp.propTypes = {
  load: T.func.isRequired,
  parameters: T.array
}

EmbeddedApp.defaultProps = {
  parameters: []
}

export {
  EmbeddedApp
}
