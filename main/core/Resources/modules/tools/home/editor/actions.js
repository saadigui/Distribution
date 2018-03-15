import {trans} from '#/main/core/translation'
import {makeActionCreator} from '#/main/core/scaffolding/actions'
import {API_REQUEST} from '#/main/core/api/actions'

import {actions as modalActions} from '#/main/core/layout/modal/actions'
import {MODAL_DELETE_CONFIRM} from '#/main/core/layout/modal'
import {MODAL_ADD_WIDGET} from '#/main/core/widget/modals/components/add-widget'
import {MODAL_EDIT_WIDGET} from '#/main/core/widget/modals/components/edit-widget'

export const WIDGET_ADD    = 'WIDGET_ADD'
export const WIDGET_REMOVE = 'WIDGET_REMOVE'

export const actions = {}

actions.addWidget = makeActionCreator(WIDGET_ADD, 'position', 'widgetType')
actions.updateWidget = makeActionCreator(WIDGET_ADD, 'position', 'widget')
actions.removeWidget = makeActionCreator(WIDGET_REMOVE, 'position')

// todo : cache available widgets
actions.insertWidget = (context, position) => ({
  [API_REQUEST]: {
    url: ['apiv2_widget_available', {context: 'desktop'}],
    success: (response, dispatch) => dispatch(modalActions.showModal(MODAL_ADD_WIDGET, {
      availableWidgets: response,
      add: (widgetType, dispatch) => dispatch(actions.addWidget(position, widgetType))
    }))
  }
})

actions.editWidget = (position, widget) => modalActions.showModal(MODAL_EDIT_WIDGET, {
  data: widget,
  save: (updated, dispatch) => dispatch(actions.updateWidget(position, updated))
})

actions.deleteWidget = (position) => (dispatch) => dispatch(modalActions.showModal(MODAL_DELETE_CONFIRM, {
  title: trans('widget_delete_confirm_title', {}, 'home'),
  question: trans('widget_delete_confirm_message', {}, 'home'),
  handleConfirm: () => dispatch(actions.removeWidget(position))
}))
