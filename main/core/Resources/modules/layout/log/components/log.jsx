import React, {Component} from 'react'
import {PropTypes as T} from 'prop-types'
import classes from 'classnames'
import Alert from 'react-bootstrap/lib/Alert'
import Modal from 'react-bootstrap/lib/Modal'

import {trans} from '#/main/core/translation'
import {BaseModal} from '#/main/core/layout/modal/components/base.jsx'
import {actions} from '#/main/core/layout/log/actions'

class LogModal extends Component {
  render() {
    return (
      <BaseModal {...this.props}>
        <Modal.Body>
          <pre id="log-content">
            {this.props.content}
          </pre>
        </Modal.Body>
        <button
          className="modal-btn btn btn-primary"
          onClick={() => this.props.fadeModal()}
        >
          {trans('Ok')}
        </button>
      </BaseModal>
    )
  }

  componentDidMount() {
    actions.load(this.props.file)
  }
}


LogModal.propTypes = {
  message: T.string.isRequired,
  fadeModal: T.func.isRequired,
  file: T.string.isRequired
}

LogModal.defaultProps = {
  bsStyle: 'info',
  content: ''
}

export {LogModal}
