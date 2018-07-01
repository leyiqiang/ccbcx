import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import {OFFICE_LIST, OFFICE_QUESTION_DETAILS} from '../../data/route'
import OfficeQuestionListPage from './OfficeQuestionListPage'
import OfficeQuestionDetailsPage from './OfficeQuestionDetailsPage'

class OfficeRoutePage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path={OFFICE_LIST} component={OfficeQuestionListPage} />
          <Route path={OFFICE_QUESTION_DETAILS} component={OfficeQuestionDetailsPage} />
          <Route path={'*'} component={() => <Redirect to={OFFICE_LIST}/> } />
        </Switch>
      </div>
    )
  }
}

export default OfficeRoutePage