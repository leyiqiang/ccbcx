import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Button } from 'reactstrap'
import { SIGN_IN } from 'src/data/route'
import SignUpForm from 'src/components/SignUpForm'
import PropTypes from 'prop-types'


@inject(stores => {
  const { registerStore } = stores
  const {
    userName,
    nickName,
    password,
    confirmPassword,
    setUserName,
    setNickName,
    setPassword,
    setConfirmPassword,
    errorMessage,
    register,
  } = registerStore
  return {
    userName,
    nickName,
    password,
    confirmPassword,
    setUserName,
    setNickName,
    setPassword,
    setConfirmPassword,
    errorMessage,
    register,
  }
})
@observer
class SignUpPage extends Component {
  constructor(props) {
    super(props)
    this.onRedirect = this.onRedirect.bind(this)
  }

  onRedirect() {
    this.props.history.push(SIGN_IN)
  }

  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  render() {
    // const { userName, password, setUserName, setPassword, errorMessage, register } = this.props
    return (
      <div>
        <SignUpForm
          {...this.props}
        />
        <Button onClick={this.onRedirect} color='link'>登陆</Button>
      </div>
    )
  }
}

export default SignUpPage