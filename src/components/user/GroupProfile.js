import React, { Component } from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import _ from 'lodash'

@observer
class GroupProfile extends Component {
  constructor(props) {
    super(props)
    this.onCreateTeam = this.onCreateTeam.bind(this)
  }

  static propTypes = {
    groupName: PropTypes.string,
  }

  render() {
    const { groupName } = this.props
    return (
      <div>
        <p>队名: {groupName}</p>
      </div>
    )
  }
}

export default GroupProfile