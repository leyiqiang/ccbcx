import React, { Component } from 'react'
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import { Jumbotron } from 'reactstrap'
import _ from 'lodash'
import GroupProfile from 'src/components/group/GroupProfile'
import GroupSubmitForm from 'src/components/group/GroupSubmitForm'
// import {joinGroup} from '../../api/group'

@inject(stores => {
  const { groupStore, loadingStore } = stores
  const {
    createGroup,
    joinGroup,
    getGroupInfo,
    groupName,
    groupContact,
    memberList,
    invitationCode,
    leaveGroup,
    deleteGroup,
    errorMessage,
  } = groupStore
  // const { isUserProfileLoading } = loadingStore
  return {
    groupName,
    getGroupInfo,
    groupContact,
    memberList,
    invitationCode,
    createGroup,
    joinGroup,
    leaveGroup,
    deleteGroup,
    errorMessage,
  }
})
@observer
class GroupProfilePage extends Component {
  constructor(props) {
    super(props)
    this.renderGroupProfile = this.renderGroupProfile.bind(this)
    this.renderErrorMessage = this.renderErrorMessage.bind(this)
  }

  static propTypes = {
    createGroup: PropTypes.func.isRequired,
    joinGroup: PropTypes.func.isRequired,
    getGroupInfo: PropTypes.func.isRequired,
    groupName: PropTypes.string,
    groupContact: PropTypes.string,
    memberList: MobxPropTypes.observableArray,
    invitationCode: PropTypes.string,
    errorMessage: PropTypes.string,
    leaveGroup: PropTypes.func.isRequired,
    deleteGroup: PropTypes.func.isRequired,
  }

  renderErrorMessage() {
    if (_.isNil(this.props.errorMessage)) {
      return
    } else {
      return (
        <div className='alert alert-danger' role='alert'>
          {this.props.errorMessage}
        </div>
      )
    }
  }

  componentWillMount() {
    this.props.getGroupInfo()
  }
  renderGroupProfile() {
    const {
      createGroup,
      joinGroup,
      groupName,
      groupContact,
      memberList,
      invitationCode,
      leaveGroup,
      deleteGroup,
      errorMessage,
    } = this.props
    if (_.isNil(groupName)) {
      return (
        <GroupSubmitForm
          createGroup={createGroup}
          joinGroup={joinGroup}
          errorMessage={errorMessage}
        />)
    }
    return (
      <GroupProfile
        groupName={groupName}
        groupContact={groupContact}
        memberList={memberList}
        invitationCode={invitationCode}
        leaveGroup={leaveGroup}
        deleteGroup={deleteGroup}
      />)
  }

  render() {
    return (
      <div>
        <Jumbotron>
          {this.renderErrorMessage()}
          <h3>组队信息</h3>
          {this.renderGroupProfile()}
        </Jumbotron>
      </div>
    )
  }
}

export default GroupProfilePage