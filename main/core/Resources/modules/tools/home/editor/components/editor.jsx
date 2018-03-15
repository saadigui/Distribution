import React, {Component} from 'react'
import {PropTypes as T} from 'prop-types'
import {connect} from 'react-redux'

import {trans} from '#/main/core/translation'
import {actions as modalActions} from '#/main/core/layout/modal/actions'
import {MODAL_DELETE_CONFIRM} from '#/main/core/layout/modal'
import {TooltipAction} from '#/main/core/layout/button/components/tooltip-action'

import {Widget} from '#/main/core/widget/components/widget'
import {WidgetInstance as WidgetInstanceTypes} from '#/main/core/widget/prop-types'
import {MODAL_ADD_WIDGET} from '#/main/core/widget/modals/components/add-widget'
import {MODAL_EDIT_WIDGET} from '#/main/core/widget/modals/components//edit-widget'

import {actions} from '#/main/core/tools/home/editor/actions'

const WidgetEditor = props =>
  <div className="widget-container">
    <div className="widget-actions text-right">
      <TooltipAction
        id={`add-before-${props.instance.id}`}
        className="btn-link-default"
        icon="fa fa-fw fa-plus"
        label={trans('add_widget_before', {}, 'home')}
        action={props.insert}
      />

      <TooltipAction
        id={`edit-${props.id}`}
        className="btn-link-default"
        icon="fa fa-fw fa-pencil"
        label={trans('edit')}
        action={() => props.edit(props.instance.id)}
      />

      <TooltipAction
        id={`delete-${props.instance.id}`}
        className="btn-link-danger"
        icon="fa fa-fw fa-trash-o"
        label={trans('delete')}
        action={() => props.delete(props.instance.id)}
      />
    </div>

    <Widget
      instance={props.instance}
      context={props.context}
    />
  </div>

WidgetEditor.propTypes = {
  context: T.object.isRequired,
  instance: T.shape(
    WidgetInstanceTypes.propTypes
  ).isRequired,
  insert: T.func.isRequired,
  edit: T.func.isRequired,
  delete: T.func.isRequired
}

const EditorComponent = props =>
  <div>
    {props.widgets.map((widgetInstance, index) =>
      <WidgetEditor
        key={index}
        instance={widgetInstance}
        context={props.context}
        insert={() => props.addWidget(index)}
        edit={() => props.editWidget(widgetInstance)}
        delete={() => props.deleteWidget(widgetInstance)}
      />
    )}

    <button
      className="btn btn-block btn-primary btn-add"
      onClick={props.addWidget}
    >
      {trans('add_widget', {}, 'home')}
    </button>
  </div>

EditorComponent.propTypes = {
  context: T.object.isRequired,
  widgets: T.arrayOf(T.shape({
    // widget instances
  })).isRequired,
  addWidget: T.func.isRequired,
  editWidget: T.func.isRequired,
  deleteWidget: T.func.isRequired
}

const Editor = connect(
  state => ({
    context: {},
    widgets: [
      {
        id: 'id1',
        type: 'resource-list',
        title: 'My awesome widget 1',
        parameters: {}
      }, {
        id: 'id2',
        type: 'simple',
        title: 'My awesome widget 2',
        parameters: {
          content: 'Tchou tchou train'
        }
      }
    ]
  }),
  dispatch => ({
    addWidget(position) {
      dispatch(modalActions.showModal(MODAL_ADD_WIDGET, {
        availableWidgets: [
          {
            name: 'Simple text',
            categories: ['media']
          }, {
            name: 'Profile',
            categories: ['user']
          }, {
            name: 'Users list',
            categories: ['user']
          }, {
            name: 'Calendar',
            categories: ['event']
          }, {
            name: 'Timeline',
            categories: ['event']
          }
        ],
        add: (widgetType) => dispatch(actions.addWidget(widgetType, position))
      }))
    },
    editWidget(widget) {
      dispatch(modalActions.showModal(MODAL_EDIT_WIDGET, {
        data: widget,
        save: (updated) => true
      }))
    },
    deleteWidget(widget) {
      dispatch(modalActions.showModal(MODAL_DELETE_CONFIRM, {
        title: trans('widget_delete_confirm_title', {}, 'home'),
        question: trans('widget_delete_confirm_message', {}, 'home'),
        handleConfirm: () => dispatch(actions.removeWidget(widget.id))
      }))
    }
  })
)(EditorComponent)

export {
  Editor
}
