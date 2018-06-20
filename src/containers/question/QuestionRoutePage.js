import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import QuestionGroupPage from './QuestionMapPage'
import {QUESTION_DETAILS, QUESTION_LIST} from '../../data/route/index'
import QuestionDetailsPage from './QuestionDetailsPage'

class QuestionRoutePage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path={QUESTION_LIST} component={QuestionGroupPage} />
          <Route path={QUESTION_DETAILS} component={QuestionDetailsPage} />
          <Route path={'*'} component={() => <Redirect to={QUESTION_LIST}/> } />
        </Switch>
      </div>
    )
  }
}

export default QuestionRoutePage