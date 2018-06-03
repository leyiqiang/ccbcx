import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ROOT, LOGIN, REGISTER }  from 'src/data/route'
import _ from 'lodash'

import HomePage from './HomePage'
import LoginPage from './LoginPage'

class RoutePage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { authResult } = this.props
    if (_.isNil(authResult)) {
      return(
          <div>
            <Route path={LOGIN} component={LoginPage} />
            <Route path={'*'} component={() => <Redirect to={LOGIN}/> } />
          </div>
      )
    } else {
      return (
          <Switch>
            <Route exact path={ROOT} component={HomePage}/>
            <Route path={'*'} component={() => <Redirect to={ROOT}/> } />
          </Switch>
      )
    }
  }

}

export default RoutePage