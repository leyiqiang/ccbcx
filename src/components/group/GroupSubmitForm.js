import React, { Component } from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import _ from 'lodash'

@observer
class GroupSubmitForm extends Component {
  constructor(props) {
    super(props)
    this.onCreateTeam = this.onCreateTeam.bind(this)
    this.onJoinTeam = this.onJoinTeam.bind(this)
    this.onGroupContactChange = this.onGroupContactChange.bind(this)
    this.onGroupNameChange = this.onGroupNameChange.bind(this)
    this.onInvitationCodeChange = this.onInvitationCodeChange.bind(this)
    this.state = {
      groupName: '',
      groupContact: '',
      invitationCode:'',
    }
  }

  static propTypes = {
    groupName: PropTypes.string,
    groupContact: PropTypes.string,
    createGroup: PropTypes.func.isRequired,
    joinGroup: PropTypes.func.isRequired,
  }

  onGroupContactChange(e) {
    e.preventDefault()
    const groupContact = e.target.value
    this.setState({
      groupContact,
    })
  }

  onGroupNameChange(e) {
    e.preventDefault()
    const groupName = e.target.value
    this.setState({
      groupName,
    })
  }

  onInvitationCodeChange(e) {
    e.preventDefault()
    const invitationCode = e.target.value
    this.setState({
      invitationCode,
    })
  }

  onCreateTeam(e) {
    e.preventDefault()
    this.props.createGroup({
      groupName: this.state.groupName,
      groupContact: this.state.groupContact,
    })
  }

  onJoinTeam(e) {
    e.preventDefault()
    this.props.joinGroup({
      invitationCode: this.state.invitationCode,
    })
  }

  render() {
    return (
      <div>
        <p>您还没有队伍</p>
        <Form onSubmit={this.onJoinTeam}>
          <FormGroup>
            <Input
              type="text"
              name="inviteCode"
              placeholder="队伍邀请码"
              value={this.state.invitationCode}
              onChange={this.onInvitationCodeChange}
            />
            <Button>加入队伍</Button>
          </FormGroup>
        </Form>
        <Form onSubmit={this.onCreateTeam}>
          <FormGroup>
            <Label>队名:</Label>
            <Input
              type="text"
              name="groupName"
              placeholder="队名"
              value={this.state.groupName}
              onChange={this.onGroupNameChange}
            />
            <Label>队伍联系方式(qq/微信):</Label>
            <Input
              type="text"
              name="groupContact"
              placeholder="联系方式"
              value={this.state.groupContact}
              onChange={this.onGroupContactChange}
            />
            <Button>创建队伍</Button>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default GroupSubmitForm