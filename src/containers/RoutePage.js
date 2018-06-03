import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { ROOT, SIGN_IN, SIGN_UP }  from 'src/data/route'
import PropTypes from 'prop-types'
import _ from 'lodash'

import HomePage from './HomePage'
import SignInPage from './SignInPage'

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
  }

  static propTypes =  {
    userInfo: PropTypes.object,
  }

  render() {
    const { userInfo } = this.props
    if (_.isNil(userInfo)) {
      return(
        <div>
          <Route path={SIGN_IN} component={SignInPage} />
          <Route path={'*'} component={() => <Redirect to={SIGN_IN}/> } />
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