import React, { Component } from 'react'
import { observer } from 'mobx-react'
import _ from 'lodash'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import PropTypes from 'prop-types'

// @withRouter
@observer
class SignInForm extends Component {
  constructor(props) {
    super(props)

    this.onUserNameChange = this.onUserNameChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.onLogin = this.onLogin.bind(this)
  }

  static propTypes = {
    userName: PropTypes.string,
    password: PropTypes.string,
    setUserName: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
  }

  onUserNameChange(e) {
    e.preventDefault()
    this.props.setUserName(e.target.value)
  }

  onPasswordChange(e) {
    e.preventDefault()
    this.props.setPassword(e.target.value)
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

  onLogin(e) {
    e.preventDefault()
    this.props.login()
  }

  render() {
    return (
      <div>
        <h3>请登陆</h3>
        <Form>
          <FormGroup>
            <Label>用户名</Label>
            <Input
              type='text'
              name='userName'
              onChange={this.onUserNameChange}/>
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">密码</Label>
            <Input
              type="password"
              name="password"
              onChange={this.onPasswordChange}/>
          </FormGroup>
          <Button onClick={this.onLogin}>登陆</Button>
        </Form>
      </div>
    )
  }
}

export default SignInForm