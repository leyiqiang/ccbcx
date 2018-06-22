import React, { Component } from 'react'
import {inject, observer, PropTypes as MobxPropTypes} from 'mobx-react/index'
import PropTypes from 'prop-types'
import QuestionMap from '../../components/question/QuestionMap'
import AlertMessage from '../../components/AlertMessage'
import WithLoading from '../../components/WithLoading'


@inject(stores => {
  const { questionGroupStore, loadingStore } = stores
  const {
    getQuestionList,
    questionList,
    nextReleaseTime,
    redirectToSettings,
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
    redirectToSettings,
    getQuestionGroup,
    successMessage,
    errorMessage,
  }
})
@observer
class QuestionMapPage extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    questionList: MobxPropTypes.observableArray,
    isQuestionListLoading: PropTypes.bool.isRequired,
    getQuestionList: PropTypes.func.isRequired,
    getQuestionGroup: PropTypes.func.isRequired,
    redirectToSettings: PropTypes.func.isRequired,
    nextReleaseTime: PropTypes.string,
    successMessage: PropTypes.string,
    errorMessage: PropTypes.string,
  }

  componentWillMount() {
    this.props.getQuestionGroup()
    this.props.getQuestionList()
  }

  render() {
    const { isQuestionListLoading, nextReleaseTime, questionList, redirectToSettings } = this.props
    const QuestionMapWithLoading = WithLoading(QuestionMap)
    return (
      <div className='container'>
        <AlertMessage bsStyle='danger' message={this.props.errorMessage}/>
        <AlertMessage bsStyle='success' message={this.props.successMessage}/>
        <QuestionMapWithLoading
          questionList={questionList}
          isLoading={isQuestionListLoading}
          redirectToSettings={redirectToSettings}
        />
        {nextReleaseTime && `下一组题发布时间: ${nextReleaseTime}`}
      </div>
    )
  }
}

export default QuestionMapPage