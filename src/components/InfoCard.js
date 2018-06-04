import React, { Component } from 'react'
import { Jumbotron } from 'reactstrap'

class InfoCard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Jumbotron>
          <h2 className='display-4'>CCBCX</h2>
          <p className='lead'>欢迎.</p>
        </Jumbotron>
      </div>
    )
  }
}
export default InfoCard