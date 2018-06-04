import React, { Component } from 'react'
import { observer } from 'mobx-react'
import _ from 'lodash'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import PropTypes from 'prop-types'

// @withRouter
@observer
class SignUpForm extends Component {
  constructor(props) {
    super(props)

    this.onUserNameChange = this.onUserNameChange.bind(this)
    this.onNickNameChange = this.onNickNameChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this)
    this.renderErrorMessage = this.renderErrorMessage.bind(this)
    this.onRegister = this.onRegister.bind(this)
  }

  static propTypes = {
    userName: PropTypes.string,
    nickName: PropTypes.string,
    password: PropTypes.string,
    confirmPassword: PropTypes.string,
    setUserName: PropTypes.func.isRequired,
    setNickName: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    setConfirmPassword: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
  }

  onUserNameChange(e) {
    e.preventDefault()
    this.props.setUserName(e.target.value)
  }

  onNickNameChange(e) {
    e.preventDefault()
    this.props.setNickName(e.target.value)
  }

  onPasswordChange(e) {
    e.preventDefault()
    this.props.setPassword(e.target.value)
  }

  onConfirmPasswordChange(e) {
    e.preventDefault()
    this.props.setConfirmPassword(e.target.value)
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

  onRegister(e) {
    e.preventDefault()
    this.props.register()
  }

  render() {
    const { userName, nickName, password, confirmPassword } = this.props
    return (
      <div>
        <h3>注册</h3>
        <Form>
          {this.renderErrorMessage()}
          <FormGroup>
            <Label>用户名</Label>
            <Input
              type='text'
              name='userName'
              value={userName}
              onChange={this.onUserNameChange}/>
          </FormGroup>
          <FormGroup>
            <Label>NickName</Label>
            <Input
              type='text'
              name='nickName'
              value={nickName}
              onChange={this.onNickNameChange}/>
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">密码</Label>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={this.onPasswordChange}/>
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Confirm your password</Label>
            <Input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={this.onConfirmPasswordChange}/>
          </FormGroup>
          <Button onClick={this.onRegister}>注册</Button>
        </Form>
      </div>
    )
  }
}

export default SignUpForm