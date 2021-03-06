import React from 'react'
import {PropTypes as T} from 'prop-types'
import {connect} from 'react-redux'

import {DataListContainer} from '#/main/core/data/list/containers/data-list.jsx'

import {select} from '#/main/core/workspace/user/selectors'
import {RoleList} from '#/main/core/administration/user/role/components/role-list.jsx'

const RolesList = props =>
  <DataListContainer
    name="roles.list"
    open={RoleList.open}
    fetch={{
      url: ['apiv2_workspace_list_roles', {id: props.workspace.uuid}],
      autoload: true
    }}
    actions={[]}
    delete={{
      url: ['apiv2_role_delete_bulk'],
      disabled: (rows) => rows.find(row => {
        if (row.name) {
          return row.name.indexOf('COLLABORATOR') > -1 || row.name.indexOf('MANAGER') > -1
        }
      })
    }}
    definition={RoleList.definition}
    card={RoleList.card}
  />

RolesList.propTypes = {
  workspace: T.object
}

const Roles = connect(
  state => ({workspace: select.workspace(state)}),
  null
)(RolesList)

export {
  Roles
}
