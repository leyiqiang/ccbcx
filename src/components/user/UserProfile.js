import React, { Component } from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'

@observer
class UserProfile extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    userName: PropTypes.string.isRequired,
    nickName: PropTypes.string.isRequired,
  }

  render() {
    const { userName, nickName } = this.props
    return (
      <div>
        <p>用户名: {userName}</p>
        <p>昵称: {nickName}</p>
      </div>
    )
  }
}

export default UserProfile