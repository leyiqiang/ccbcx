import React, { Component } from 'react'
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import WithLoading from '../../components/WithLoading'
import AlertMessage from '../../components/AlertMessage'
import QuestionDetails from '../../components/question/QuestionDetails'
// import _ from 'lodash'
// import WithLoading from 'src/components/WithLoading'

@inject(stores => {
  const { questionStore, loadingStore } = stores
  const {
    getQuestion,
    question,
    progress,
    errorMessage,
    successMessage,
    redirectToOfficeQuestionList,
    submitAnswer,
  } = questionStore
  const { isQuestionInfoLoading } = loadingStore
  return {
    getQuestion,
    question,
    progress,
    errorMessage,
    successMessage,
    submitAnswer,
    redirectToOfficeQuestionList,
    isQuestionInfoLoading,
  }
})
@observer
class OfficeQuestionDetailsPage extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    match: PropTypes.object,
    errorMessage: PropTypes.string,
    progress: PropTypes.object,
    successMessage: PropTypes.string,
    question: PropTypes.object,
    getQuestion: PropTypes.func.isRequired,
    submitAnswer: PropTypes.func.isRequired,
    isQuestionInfoLoading: PropTypes.bool.isRequired,
    redirectToOfficeQuestionList: PropTypes.func.isRequired,
  }

  componentWillMount() {
    const { questionNumber }  = this.props.match.params
    this.props.getQuestion({questionNumber})
  }

  render() {
    const {
      question,
      isQuestionInfoLoading,
      redirectToOfficeQuestionList,
      errorMessage,
      progress,
      successMessage,
      submitAnswer,
    } = this.props
    const QuestionWithLoading = WithLoading(QuestionDetails)
    return (
      <div>
        <AlertMessage bsStyle='danger' message={this.props.errorMessage}/>
        <AlertMessage bsStyle='success' message={this.props.successMessage}/>
        {question &&
          <QuestionWithLoading
            errorMessage={errorMessage}
            successMessage={successMessage}
            isLoading={isQuestionInfoLoading}
            redirectToQuestionList={redirectToOfficeQuestionList}
            submitAnswer={submitAnswer}
            progress={progress}
            {...question}
          />
        }
      </div>
    )
  }
}
export default OfficeQuestionDetailsPage