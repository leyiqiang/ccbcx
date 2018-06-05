import React, { Component } from 'react'
import { observer, PropTypes as MobxPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import _ from 'lodash'

@observer
class GroupProfile extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    groupName: PropTypes.string,
    groupContact: PropTypes.string,
    memberList: MobxPropTypes.observableArray,
    invitationCode: PropTypes.string,
  }

  render() {
    const { groupName, groupContact, memberList, invitationCode } = this.props
    return (
      <div>
        <p>队名: {groupName}</p>
        <p>Contact Info: {groupContact}</p>
        <p>Members: {_.join(memberList, ', ')}</p>
        {invitationCode && <p>Invitation Code: {invitationCode}</p>}
      </div>
    )
  }
}

export default GroupProfile