import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import GroupProfilePage from './GroupProfilePage'
import {GROUP_INFO} from 'src/data/route/index'
// import RoutePage from './RoutePage'

class GroupRoutePage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path={GROUP_INFO} component={GroupProfilePage} />
          <Route path={'*'} component={() => <Redirect to={GROUP_INFO}/> } />
        </Switch>
      </div>
    )
  }
}

export default GroupRoutePage