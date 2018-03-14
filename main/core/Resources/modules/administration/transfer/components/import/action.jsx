import React from 'react'

import {PageActions} from '#/main/core/layout/page/components/page-actions.jsx'
import {FormPageActionsContainer} from '#/main/core/data/form/containers/page-actions.jsx'
import {actions as modalActions} from '#/main/core/layout/modal/actions'
import {MODAL_LOG} from '#/main/core/layout/modal'

import {connect} from 'react-redux'

const Action = props =>
  <PageActions>
    <FormPageActionsContainer
      formName="import"
      target={['apiv2_transfer_execute', {log: '123'}]}
      opened={true}
      save={{action: (obj) => props.openLog('123')}}
    />
  </PageActions>

const ConnectedAction = connect(
  null,
  dispatch => ({
    openLog(file) {
      dispatch(
        modalActions.showModal(MODAL_LOG, {
        })
      )
    }
  })
)(Action)

export {
  ConnectedAction as Action
}
