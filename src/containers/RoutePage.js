import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { SIGN_IN, SIGN_UP, USER, GROUP, QUESTION }  from 'src/data/route'
import SignInPage from './SignInPage'
import SignUpPage from './SignUpPage'
import InfoCard from 'src/components/InfoCard'
import NavBar from '../components/NavBar'
import UserRoutePage from './user/UserRoutePage'
import Footer from '../components/Footer'
import GroupRoutePage from './group/GroupRoutePage'
import QuestionRoutePage from './question/QuestionRoutePage'

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
      const { nickName } = userInfo
      return (
        <div>
          <NavBar logout={logout} nickName={nickName}/>
          <Switch>
            <Route path={USER} component={UserRoutePage} />
            <Route path={GROUP} component={GroupRoutePage} />
            <Route path={QUESTION} component={QuestionRoutePage} />
            <Route path={'*'} component={() => <Redirect to={QUESTION}/> } />
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