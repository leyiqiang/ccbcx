import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { ROOT, SIGN_IN, SIGN_UP }  from 'src/data/route'
import HomePage from './HomePage'
import SignInPage from './SignInPage'
import SignUpPage from './SignUpPage'
import InfoCard from 'src/components/InfoCard'
import WithLoading from 'src/components/WithLoading'

@withRouter
@inject(stores => {
  const { sessionStore, loadingStore } = stores
  const { userInfo } = sessionStore
  const { isUserInfoLoading } = loadingStore
  return {
    userInfo,
    isUserInfoLoading,
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
    isUserInfoLoading: PropTypes.bool,
  }

  renderRoute() {
    const { userInfo, isUserInfoLoading } = this.props
    if(isUserInfoLoading) {
      return (<h3>Loading...</h3>)
    }
    if (_.isNil(userInfo)) {
      return(
        <div>
          <InfoCard/>
          <Switch>
            <Route path={SIGN_IN} component={SignInPage} />
            <Route path={SIGN_UP} component={SignUpPage} />
            <Route path={'*'} component={() => <Redirect to={SIGN_IN}/> } />
          </Switch>
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

  render() {
    return(
      <div>
        {this.renderRoute()}
      </div>
    )
  }

}

export default RoutePage