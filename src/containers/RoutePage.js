import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { ROOT, SIGN_IN, SIGN_UP, USER }  from 'src/data/route'
import HomePage from './HomePage'
import SignInPage from './SignInPage'
import SignUpPage from './SignUpPage'
import InfoCard from 'src/components/InfoCard'
import NavBar from '../components/NavBar'
import UserRoutePage from './user/UserRoutePage'
import Footer from '../components/Footer'

@withRouter
@inject(stores => {
  const { sessionStore, loadingStore } = stores
  const { userInfo, logout } = sessionStore
  const { isUserInfoLoading } = loadingStore
  return {
    userInfo,
    logout,
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
    logout: PropTypes.func.isRequired,
    isUserInfoLoading: PropTypes.bool.isRequired,
  }

  renderRoute() {
    const { userInfo, logout, isUserInfoLoading } = this.props
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
          <Footer/>
        </div>
      )
    } else {
      return (
        <div>
          <NavBar logout={logout}/>
          <Switch>
            <Route exact path={ROOT} component={HomePage} />
            <Route path={USER} component={UserRoutePage} />
            <Route path={'*'} component={() => <Redirect to={ROOT}/> } />
          </Switch>
          <Footer/>
        </div>
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