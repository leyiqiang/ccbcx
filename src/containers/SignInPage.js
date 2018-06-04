import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router'
import SignInForm from 'src/components/SignInForm'
import { Button } from 'reactstrap'
import { SIGN_UP } from 'src/data/route'


// @withRouter
@inject(stores => {
  const { authStore } = stores
  const {
    userName,
    password,
    setUserName,
    setPassword,
    errorMessage,
    login,
  } = authStore
  return {
    userName,
    password,
    setUserName,
    setPassword,
    errorMessage,
    login,
  }
})

@observer
class SignInPage extends Component {
  constructor(props) {
    super(props)
    this.onRedirect = this.onRedirect.bind(this)
  }

  onRedirect() {
    this.props.history.push(SIGN_UP)
  }

  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  render() {
    // const { userName, password, setUserName, setPassword, errorMessage, login } = this.props
    return (
      <div>
        <SignInForm
          {...this.props}
        />
        <Button onClick={this.onRedirect} color='link'>注册</Button>
      </div>
    )
  }
}

export default SignInPage