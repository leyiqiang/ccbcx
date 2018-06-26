import React, { Component } from 'react'
import { observer } from 'mobx-react'

import PropTypes from 'prop-types'
import { Alert } from 'react-bootstrap'

@observer
class LatestNews extends Component {

  constructor(props) {
    super(props)
    this.handleDismiss = this.handleDismiss.bind(this)
    this.state = {
      show: true,
    }
  }
  static propTypes = {
    latestNews: PropTypes.string,
  }

  handleDismiss() {
    this.setState({ show: false })
  }


  render() {
    if (this.state.show) {
      return (
        <Alert onDismiss={this.handleDismiss}>{this.props.latestNews}</Alert>
      )
    } else {
      return (null)
    }
  }
}

export default LatestNews