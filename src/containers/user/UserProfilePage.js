import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import { Jumbotron } from 'reactstrap'
import _ from 'lodash'
import UserProfile from 'src/components/user/UserProfile'
import GroupProfile from 'src/components/user/GroupProfile'
import GroupSubmitForm from 'src/components/user/GroupSubmitForm'

@inject(stores => {
  const { sessionStore, userStore, loadingStore } = stores
  const { userInfo } = sessionStore
  const {
    createGroup,
    groupName,
    groupContact,
    setGroupName,
    setGroupContact,
  } = userStore
  // const { isUserProfileLoading } = loadingStore
  return {
    userInfo,
    groupName,
    groupContact,
    createGroup,
    setGroupName,
    setGroupContact,
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
    groupName: PropTypes.string.isRequired,
    groupContact: PropTypes.string.isRequired,
    setGroupName: PropTypes.func.isRequired,
    setGroupContact: PropTypes.func.isRequired,
  }

  renderGroupProfile() {
    const {
      userInfo,
      createGroup,
      groupName,
      groupContact,
      setGroupName,
      setGroupContact,
    } = this.props
    const { groupName: userGroupName } = userInfo
    if (_.isNil(userGroupName)) {
      return (
        <GroupSubmitForm
          groupName={groupName}
          groupContact={groupContact}
          createGroup={createGroup}
          setGroupName={setGroupName}
          setGroupContact={setGroupContact}
        />)
    }

    return <GroupProfile groupName={userGroupName}/>
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