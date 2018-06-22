import React, { Component } from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

@observer
class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this)
    this.onSubmitChangePassword = this.onSubmitChangePassword.bind(this)
  }

  static propTypes = {
    password: PropTypes.string,
    confirmPassword: PropTypes.string,
    userName: PropTypes.string.isRequired,
    nickName: PropTypes.string.isRequired,
    changePassword: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    setConfirmPassword: PropTypes.func.isRequired,
  }

  onPasswordChange(e) {
    e.preventDefault()
    this.props.setPassword(e.target.value)
  }

  onConfirmPasswordChange(e) {
    e.preventDefault()
    this.props.setConfirmPassword(e.target.value)
  }

  onSubmitChangePassword() {
    this.props.changePassword()
  }

  render() {
    const { userName, nickName } = this.props
    return (
      <div>
        <p>用户名: {userName}</p>
        <p>昵称: {nickName}</p>
        <Form>
          <FormGroup>
            <Label for="password">修改密码</Label>
            <Input
              type="password"
              name="password"
              value={this.props.password}
              onChange={this.onPasswordChange}
              autoComplete='off'
            />
          </FormGroup>
          <FormGroup>
            <Label for="confirmPassword">确认修改密码</Label>
            <Input
              type="password"
              name="confirmPassword"
              autoComplete='off'
              value={this.props.confirmPassword}
              onChange={this.onConfirmPasswordChange}/>
          </FormGroup>
          <Button color='info' onClick={this.onSubmitChangePassword}>修改</Button>
        </Form>
      </div>
    )
  }
}

export default UserProfile