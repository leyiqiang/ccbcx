import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {
  SIGN_IN,
  SIGN_UP,
  USER,
  GROUP,
  QUESTION,
  OFFICE,
  NEWS,
} from 'src/data/route'
import SignInPage from './SignInPage'
import SignUpPage from './SignUpPage'
import InfoCard from 'src/components/InfoCard'
import NavBar from '../components/NavBar'
import UserRoutePage from './user/UserRoutePage'
import Footer from '../components/Footer'
import GroupRoutePage from './group/GroupRoutePage'
import QuestionRoutePage from './question/QuestionRoutePage'
import OfficeRoutePage from './office/OfficeRoutePage'
import NewsPage from './news/NewsPage'
import LatestNews from '../components/LatestNews'

@withRouter
@inject(stores => {
  const { sessionStore, newsStore, loadingStore } = stores
  const { userInfo, logout } = sessionStore
  const { isUserInfoLoading } = loadingStore
  const { latestNews } = newsStore
  return {
    userInfo,
    logout,
    latestNews,
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
    latestNews: PropTypes.string,
    isUserInfoLoading: PropTypes.bool.isRequired,
  }

  renderRoute() {
    const { userInfo, logout, isUserInfoLoading, latestNews } = this.props
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
          <div className='container'>
            <NavBar logout={logout} nickName={nickName}/>
            {latestNews && <LatestNews latestNews={latestNews}/>}
            <Switch>
              <Route exact path={NEWS} component={NewsPage} />
              <Route path={USER} component={UserRoutePage} />
              <Route path={GROUP} component={GroupRoutePage} />
              <Route path={QUESTION} component={QuestionRoutePage} />
              <Route path={OFFICE} component={OfficeRoutePage} />
              <Route path={'*'} component={() => <Redirect to={QUESTION}/> } />
            </Switch>
          </div>
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