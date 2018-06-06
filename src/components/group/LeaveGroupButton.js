import React, { Component } from 'react'
import { observer, PropTypes as MobxPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import {Button} from 'reactstrap'
import alertify from '../../../node_modules/alertify.js/dist/js/alertify'
import _ from 'lodash'


@observer
class LeaveGroupButton extends Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  static propTypes = {
    leaveGroup: PropTypes.func.isRequired,
  }

  onClick(e) {
    e.preventDefault()
    const { leaveGroup } = this.props
    alertify
      .okBtn('确认')
      .cancelBtn('取消')
      .confirm('你确定要离开队伍？', () => {
      // user clicked "ok"
        leaveGroup()
      })
  }

  render() {
    return(
      <div>
        <Button onClick={this.onClick} color='danger'>离开队伍</Button>
      </div>
    )
  }
}

export default LeaveGroupButton