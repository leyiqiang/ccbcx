import React, { Component } from 'react'
import { observer, PropTypes as MobxPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import {Button} from 'reactstrap'
import alertify from '../../../node_modules/alertify.js/dist/js/alertify'
import _ from 'lodash'


@observer
class DeleteGroupButton extends Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  static propTypes = {
    deleteGroup: PropTypes.func.isRequired,
    groupName: PropTypes.string.isRequired,
  }

  onClick(e) {
    e.preventDefault()
    const { deleteGroup, groupName } = this.props
    alertify
      .okBtn('确认')
      .cancelBtn('取消')
      .confirm('你确定要接撒队伍？该过程不可逆', () => {
      // user clicked "ok"
        deleteGroup({ groupName })
      })
  }

  render() {
    return(
      <div>
        <Button onClick={this.onClick} color='danger'>解散队伍</Button>
      </div>
    )
  }
}

export default DeleteGroupButton