import React, { Component } from 'react'
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import { Jumbotron } from 'reactstrap'
import _ from 'lodash'
import UserProfile from 'src/components/user/UserProfile'
import GroupProfile from 'src/components/group/GroupProfile'
import GroupSubmitForm from 'src/components/group/GroupSubmitForm'
import {joinGroup} from '../../api/group'

@inject(stores => {
  const { sessionStore, loadingStore } = stores
  const { userInfo } = sessionStore
  // const { isUserProfileLoading } = loadingStore
  return {
    userInfo,
  }
})
@observer
class UserProfilePage extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    userInfo: PropTypes.object.isRequired,
  }

  render() {
    const { userInfo } = this.props
    const { userName, nickName } = userInfo
    return (
      <div>
        <Jumbotron>
          <h3>个人信息</h3>
          <UserProfile userName={userName} nickName={nickName}/>
        </Jumbotron>
      </div>
    )
  }
}

export default UserProfilePage