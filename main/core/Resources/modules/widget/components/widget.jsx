import React from 'react'
import {PropTypes as T} from 'prop-types'

import {EmbeddedApp} from '#/main/app/components/embedded-app'

import {WidgetInstance as WidgetInstanceTypes} from '#/main/core/widget/prop-types'
import {getWidget} from '#/main/core/widget/types'

const Widget = props =>
  <section className="widget">
    {props.instance.title &&
      <h2 className="h-first widget-title">{props.instance.title}</h2>
    }

    <EmbeddedApp
      loader={getWidget(props.instance.type).load}
      parameters={[props.instance, props.context]}
    />
  </section>

Widget.propTypes = {
  instance: T.shape(
    WidgetInstanceTypes.propTypes
  ).isRequired,
  context: T.object
}

export {
  Widget
}
