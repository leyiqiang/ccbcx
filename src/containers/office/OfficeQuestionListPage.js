import React, { Component } from 'react'
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { ListGroup } from 'reactstrap'
import QuestionDetailsButton
  from '../../components/question/QuestionDetailsButton'


@inject(stores => {
  const { questionGroupStore, loadingStore } = stores
  const {
    getQuestionList,
    questionList,
    nextReleaseTime,
    redirectToOfficeQuestionSettings,
    successMessage,
    errorMessage,
    getQuestionGroup,
  } = questionGroupStore
  const { isQuestionListLoading } = loadingStore
  return {
    getQuestionList,
    questionList,
    nextReleaseTime,
    isQuestionListLoading,
    redirectToOfficeQuestionSettings,
    getQuestionGroup,
    successMessage,
    errorMessage,
  }
})
@observer
class OfficeQuestionListPage extends Component {
  constructor(props) {
    super(props)
    this.renderQuestionList = this.renderQuestionList.bind(this)
    this.renderErrorMessage = this.renderErrorMessage.bind(this)
  }

  static propTypes = {
    questionList: MobxPropTypes.observableArray,
    isQuestionListLoading: PropTypes.bool.isRequired,
    getQuestionList: PropTypes.func.isRequired,
    getQuestionGroup: PropTypes.func.isRequired,
    redirectToOfficeQuestionSettings: PropTypes.func.isRequired,
    nextReleaseTime: PropTypes.string,
    successMessage: PropTypes.string,
    errorMessage: PropTypes.string,
  }

  renderErrorMessage() {
    if (_.isNil(this.props.errorMessage)) {
      return
    } else {
      return (
        <div className='alert alert-danger' role='alert'>
          {this.props.errorMessage}
        </div>
      )
    }
  }

  componentWillMount() {
    this.props.getQuestionList()
  }
  renderQuestionList() {
    const {
      questionList,
      isQuestionListLoading,
      redirectToOfficeQuestionSettings,
    } = this.props
    const metaQuestionList = _.filter(questionList, (q) => {return q.isMeta === true})
    const orderedList = _.orderBy(metaQuestionList, q => q.questionNumber)
    const questionListView = _.map(orderedList, (q) => {
      const onRedirectToOfficeQuestionSettings = () => {
        redirectToOfficeQuestionSettings({questionNumber: q.questionNumber})
      }
      return (
        <QuestionDetailsButton
          key={q.questionNumber}
          questionNumber={q.questionNumber}
          onRedirectToQuestionSettings={onRedirectToOfficeQuestionSettings}
          isMeta={q.isMeta}
        />
      )
    })
    if (isQuestionListLoading) {
      return <h3>Loading...</h3>
    }
    return(
      <ListGroup>
        {questionListView}
      </ListGroup>
    )
  }

  render() {
    return (
      <div>
        {this.renderErrorMessage()}
        <h3>Office</h3>
        {this.renderQuestionList()}
      </div>
    )
  }
}

export default OfficeQuestionListPage