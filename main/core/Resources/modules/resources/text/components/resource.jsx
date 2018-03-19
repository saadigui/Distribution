import React from 'react'
import {PropTypes as T} from 'prop-types'
import {connect} from 'react-redux'

import {trans} from '#/main/core/translation'
import {select as resourceSelect} from '#/main/core/resource/selectors'
import {select as formSelect} from '#/main/core/data/form/selectors'
import {actions as formActions} from '#/main/core/data/form/actions'
import {RoutedPageContent} from '#/main/core/layout/router'
import {ResourcePageContainer} from '#/main/core/resource/containers/page.jsx'

import {Player} from '#/main/core/resources/text/player/components/player.jsx'
import {Editor} from '#/main/core/resources/text/editor/components/editor.jsx'

const Resource = props => {
  const routes = [
    {
      path: '/play',
      component: Player
    }, {
      path: '/edit',
      component: Editor
    }
  ]
  const redirect = [{
    from: '/',
    to: '/play',
    exact: true
  }]

  return (
    <ResourcePageContainer
      editor={{
        path: '/edit',
        save: {
          disabled: false,
          action: () => {}
          // disabled: !props.saveEnabled,
          // action: () => props.saveForm(props.path.id)
        }
      }}
      customActions={[]}
    >
      <RoutedPageContent
        headerSpacer={false}
        redirect={redirect}
        routes={routes}
      />
    </ResourcePageContainer>
  )
}

Resource.propTypes = {
  resource: T.shape({
    id: T.string.isRequired,
    autoId: T.number.isRequired
  }).isRequired,
  canEdit: T.bool.isRequired
}

const TextResource = connect(
  state => ({
    resource: state.resourceNode,
    canEdit: resourceSelect.editable(state),
  })
  // (dispatch) => ({
  //   saveForm: (pathId) => dispatch(formActions.saveForm('pathForm', ['apiv2_path_update', {id: pathId}]))
  // })
)(Resource)

export {
  TextResource
}