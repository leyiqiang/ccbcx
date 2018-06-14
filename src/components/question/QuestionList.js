import React, { Component } from 'react'
import {observer, PropTypes as MobxPropTypes} from 'mobx-react/index'
import { ListGroup } from 'reactstrap'
import _ from 'lodash'
import PropTypes from 'prop-types'
import QuestionDetailsButton from './QuestionDetailsButton'

@observer
class QuestionList extends Component {
  constructor(props) {
    super(props)
    this.renderGroupList = this.renderGroupList.bind(this)
  }

  static propTypes = {
    questionList: MobxPropTypes.observableArray,
    groupType: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    redirectToSettings: PropTypes.func.isRequired,
  }


  renderGroupList() {
    const {
      questionList,
      isLoading,
      groupType,
      redirectToSettings,
    } = this.props
    const groupListView = _.map(questionList, (q) => {
      if (q.groupType === groupType) {
        const onRedirectToQuestionSettings = () => {
          redirectToSettings({questionNumber: q.questionNumber})
        }
        return (
          <QuestionDetailsButton
            key={q.questionNumber}
            isMeta={q.isMeta}
            questionNumber={q.questionNumber}
            onRedirectToQuestionSettings={onRedirectToQuestionSettings}/>
        )
      }
    })
    if (isLoading) {
      return <h3>Loading...</h3>
    }

    return groupListView
  }

  render() {
    return (
      <div>
        <ListGroup>
          {this.renderGroupList()}
        </ListGroup>
      </div>
    )
  }
}

export default QuestionList
