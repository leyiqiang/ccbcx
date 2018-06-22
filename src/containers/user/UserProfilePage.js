import React, { Component } from 'react'
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import { Jumbotron } from 'reactstrap'
import UserProfile from 'src/components/user/UserProfile'
import AlertMessage from '../../components/AlertMessage'

@inject(stores => {
  const { sessionStore, passwordStore, loadingStore } = stores
  const { userInfo } = sessionStore
  const{
    changePassword,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    successMessage,
    errorMessage,
    resetForm,
  } = passwordStore
  return {
    userInfo,
    resetForm,
    changePassword,
    setPassword,
    password,
    setConfirmPassword,
    confirmPassword,
    successMessage,
    errorMessage,
  }
})
@observer
class UserProfilePage extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.resetForm()
  }

  static propTypes = {
    userInfo: PropTypes.object.isRequired,
    changePassword: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    password: PropTypes.string,
    confirmPassword: PropTypes.string,
    setConfirmPassword: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    successMessage: PropTypes.string,
  }

  render() {
    const {
      userInfo,
      changePassword,
      setPassword,
      password,
      confirmPassword,
      setConfirmPassword } = this.props
    const { userName, nickName } = userInfo
    return (
      <div>
        <Jumbotron>
          <AlertMessage bsStyle='danger' message={this.props.errorMessage}/>
          <AlertMessage bsStyle='success' message={this.props.successMessage}/>
          <h3>个人信息</h3>
          <UserProfile
            userName={userName}
            nickName={nickName}
            password={password}
            confirmPassword={confirmPassword}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
            changePassword={changePassword}
          />
        </Jumbotron>
      </div>
    )
  }
}

export default UserProfilePage