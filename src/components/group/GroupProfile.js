import React, { Component } from 'react'
import { observer, PropTypes as MobxPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import {Button} from 'reactstrap'
import _ from 'lodash'
import LeaveGroupButton from './LeaveGroupButton'
import DeleteGroupButton from './DeleteGroupButton'

@observer
class GroupProfile extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    groupName: PropTypes.string,
    groupContact: PropTypes.string,
    leaveGroup: PropTypes.func.isRequired,
    deleteGroup: PropTypes.func.isRequired,
    memberList: MobxPropTypes.observableArray,
    invitationCode: PropTypes.string,
  }

  render() {
    const {
      groupName,
      groupContact,
      memberList,
      leaveGroup,
      deleteGroup,
      invitationCode } = this.props
    return (
      <div>
        <p>队名: {groupName}</p>
        <p>联系方式: {groupContact}</p>
        <p>成员: {_.join(memberList, ', ')}</p>
        {invitationCode && <p>队伍邀请码: {invitationCode}</p>}
        <h5>(注: 队伍最多5人, 组员输入邀请码即可加入)</h5>
        {invitationCode ?
          <DeleteGroupButton deleteGroup={deleteGroup} groupName={groupName}/> :
          <LeaveGroupButton leaveGroup={leaveGroup} />}
      </div>
    )
  }
}

export default GroupProfile