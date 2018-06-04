import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import {withRouter} from 'react-router'
import InfoCard from 'src/components/InfoCard'
import SignInForm from 'src/components/SignInForm'
import { Button } from 'reactstrap'


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
  }

  render() {
    // const { userName, password, setUserName, setPassword, errorMessage, login } = this.props
    return (
      <div>
        <InfoCard />
        <SignInForm
          {...this.props}
        />
        <Button color='info'>注册</Button>
      </div>
    )
  }
}

export default SignInPage