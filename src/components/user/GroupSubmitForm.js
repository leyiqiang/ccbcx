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
    this.onGroupContactChange = this.onGroupContactChange.bind(this)
    this.onGroupNameChange = this.onGroupNameChange.bind(this)
  }

  static propTypes = {
    groupName: PropTypes.string.isRequired,
    groupContact: PropTypes.string.isRequired,
    createGroup: PropTypes.func.isRequired,
    setGroupName: PropTypes.func.isRequired,
    setGroupContact: PropTypes.func.isRequired,
  }

  onGroupContactChange(e) {
    e.preventDefault()
    const groupContact = e.target.value
    this.props.setGroupContact({
      groupContact,
    })
  }

  onGroupNameChange(e) {
    e.preventDefault()
    const groupName = e.target.value
    this.props.setGroupName({
      groupName,
    })
  }

  onCreateTeam(e) {
    e.preventDefault()
    this.props.createGroup()
  }

  render() {
    return (
      <div>
        <p>您还没有队伍</p>
        <Form onSubmit={null}>
          <FormGroup>
            <Input type="text" name="inviteCode" placeholder="队伍邀请码" />
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
              value={this.props.groupName}
              onChange={this.onGroupNameChange}
            />
            <Label>队伍联系方式(qq/微信):</Label>
            <Input
              type="text"
              name="groupContact"
              placeholder="联系方式"
              value={this.props.groupContact}
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