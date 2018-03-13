import React from 'react'
import {PropTypes as T} from 'prop-types'

import {trans} from '#/main/core/translation'
import {NavLink} from '#/main/core/router'

import {PathSummary} from '#/plugin/path/resources/path/components/summary.jsx'

const SummaryStep = props =>
  <li className="summary-link">
    <NavLink to={`/play/${props.step.id}`}>
      <span className="step-progression fa fa-circle" />

      {props.step.title}
    </NavLink>

    {props.step.children && 0 !== props.step.children.length &&
      <ul className="step-children">
        {props.step.children.map(child =>
          <SummaryStep key={child.id} step={child} />
        )}
      </ul>
    }
  </li>

SummaryStep.propTypes = {
  step: T.shape({

  }).isRequired
}

const Summary = props =>
  <PathSummary>
    <ul className="summary">
      {props.steps.map(step =>
        <SummaryStep key={step.id} step={step} />
      )}
    </ul>
  </PathSummary>

Summary.propTypes = {
  opened: T.bool,
  pinned: T.bool,
  steps: T.arrayOf(T.shape({
    // step
  }))
}

Summary.defaultProps = {
  steps: []
}

export {
  Summary
}