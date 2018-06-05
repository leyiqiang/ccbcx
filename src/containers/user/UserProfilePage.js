import React, { Component } from 'react'
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import { Jumbotron } from 'reactstrap'
import _ from 'lodash'
import UserProfile from 'src/components/user/UserProfile'
import GroupProfile from 'src/components/user/GroupProfile'
import GroupSubmitForm from 'src/components/user/GroupSubmitForm'
import {joinGroup} from '../../api/group';

@inject(stores => {
  const { sessionStore, groupStore, loadingStore } = stores
  const { userInfo } = sessionStore
  const {
    createGroup,
    joinGroup,
    getGroupInfo,
    groupName,
    groupContact,
    memberList,
    invitationCode,
    errorMessage: groupErrorMessage,
  } = groupStore
  // const { isUserProfileLoading } = loadingStore
  return {
    userInfo,
    groupName,
    getGroupInfo,
    groupContact,
    memberList,
    invitationCode,
    createGroup,
    joinGroup,
    groupErrorMessage,
  }
})
@observer
class UserProfilePage extends Component {
  constructor(props) {
    super(props)
    this.renderGroupProfile = this.renderGroupProfile.bind(this)
  }

  static propTypes = {
    userInfo: PropTypes.object.isRequired,
    createGroup: PropTypes.func.isRequired,
    joinGroup: PropTypes.func.isRequired,
    getGroupInfo: PropTypes.func.isRequired,
    groupName: PropTypes.string,
    groupContact: PropTypes.string,
    memberList: MobxPropTypes.observableArray,
    invitationCode: PropTypes.string,
    groupErrorMessage: PropTypes.string,
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
      groupErrorMessage,
    } = this.props
    if (_.isNil(groupName)) {
      return (
        <GroupSubmitForm
          createGroup={createGroup}
          joinGroup={joinGroup}
          errorMessage={groupErrorMessage}
        />)
    }

    return (
      <GroupProfile
        groupName={groupName}
        groupContact={groupContact}
        memberList={memberList}
        invitationCode={invitationCode}
      />)
  }

  render() {
    const { userInfo } = this.props
    const { userName, nickName } = userInfo
    return (
      <div>
        <Jumbotron>
          <h3>组队信息</h3>
          {this.renderGroupProfile()}
        </Jumbotron>
        <Jumbotron>
          <h3>个人信息</h3>
          <UserProfile userName={userName} nickName={nickName}/>
        </Jumbotron>
      </div>
    )
  }
}

export default UserProfilePage