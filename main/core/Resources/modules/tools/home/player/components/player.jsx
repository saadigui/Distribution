import React from 'react'
import {PropTypes as T} from 'prop-types'
import {connect} from 'react-redux'

import {Widget} from '#/main/core/widget/components/widget'
import {WidgetInstance as WidgetInstanceTypes} from '#/main/core/widget/prop-types'

const PlayerComponent = props =>
  <div>
    {props.widgets.map((widgetInstance, index) =>
      <Widget
        key={index}
        instance={widgetInstance}
        context={props.context}
      />
    )}
  </div>

PlayerComponent.propTypes = {
  context: T.object.isRequired,
  widgets: T.arrayOf(T.shape(
    WidgetInstanceTypes.propTypes
  )).isRequired
}

const Player = connect(
  (state) => ({
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
  })
)(PlayerComponent)

export {
  Player
}
