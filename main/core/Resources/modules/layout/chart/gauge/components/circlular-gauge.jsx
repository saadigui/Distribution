import React, { Component } from 'react'
import {PropTypes as T} from 'prop-types'

import { implementPropTypes } from '#/main/core/scaffolding/prop-types'
import {Chart as ChartTypes} from '#/main/core/layout/chart/prop-types'
import {Chart} from '#/main/core/layout/chart/components/chart.jsx'
import {DataSeries} from '#/main/core/layout/chart/pie/components/data-series.jsx'

/**
 * Draws a Circular gauge
 */
class CircularGauge extends Component {
  render() {
    const radius = this.props.width / 2

    return (
      <Chart
        width={this.props.width}
        height={this.props.width}
        margin={{
          'top': radius,
          'left': radius
        }}
      >
        <g
          alignmentBaseline={'middle'}
        >
          <text
            strokeWidth={1}
            textAnchor={'middle'}
          >
            {this.props.label}
          </text>

          <text
            fontSize="24"
            stroke={this.props.color}
            fill={this.props.color}
            textAnchor={'middle'}
            y={24}
          >
            {this.props.value}
          </text>
        </g>

        <DataSeries
          data={[this.props.value, this.props.max - this.props.value]}
          colors={[this.props.color, '#ccc']}
          innerRadius={radius - this.props.size}
          outerRadius={radius}
          showValue={this.props.showValue}
        />
      </Chart>
    )
  }
}

implementPropTypes(CircularGauge, ChartTypes, {
  value: T.number,
  max: T.number.isRequired,
  color: T.string,
  label: T.string,
  size: T.number,
  showValue: T.bool.isRequired
}, {
  value: 0,
  color: '#337ab7', // Default bootstrap primary color
  label: null,
  width: 200,
  size: 30,
  showValue: true
})

export {
  CircularGauge
}
