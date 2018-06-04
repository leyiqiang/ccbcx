import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { ROOT, SIGN_IN, SIGN_UP }  from 'src/data/route'
import HomePage from './HomePage'
import SignInPage from './SignInPage'

@withRouter
@inject(stores => {
  const { sessionStore } = stores
  const { userInfo } = sessionStore
  return {
    userInfo,
  }
})
@observer
class RoutePage extends Component {
  constructor(props) {
    super(props)
    this.renderRoute = this.renderRoute.bind(this)
  }

  static propTypes =  {
    userInfo: PropTypes.object,
  }

  renderRoute() {
    const { userInfo } = this.props
    if (_.isNil(userInfo)) {
      return(
        <Switch>
          <Route path={SIGN_IN} component={SignInPage} />
          <Route path={'*'} component={() => <Redirect to={SIGN_IN}/> } />
        </Switch>
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

  render() {
    return(
      <div>
        {this.renderRoute()}
      </div>
    )
  }

}

export default RoutePage