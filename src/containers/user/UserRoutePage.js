import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { USER_INFO }  from 'src/data/route'
import UserProfilePage from './UserProfilePage'
// import RoutePage from './RoutePage'

class UserRoutePage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path={USER_INFO} component={UserProfilePage} />
          <Route path={'*'} component={() => <Redirect to={USER_INFO}/> } />
        </Switch>
      </div>
    )
  }
}

export default UserRoutePage