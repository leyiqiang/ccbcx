import React, { Component } from 'react'
import { Jumbotron } from 'reactstrap'
import { Tabs, Tab } from 'react-bootstrap'
import {inject, observer, PropTypes as MobxPropTypes} from 'mobx-react/index'
import PropTypes from 'prop-types'
import _ from 'lodash'
import QuestionList from '../../components/question/QuestionList'
import AlertMessage from '../../components/AlertMessage'



@inject(stores => {
  const { questionGroupStore, loadingStore } = stores
  const {
    questionGroup,
    getQuestionList,
    questionList,
    nextReleaseTime,
    getQuestionGroup,
    activeKey,
    setActiveKey,
    redirectToSettings,
    successMessage,
    errorMessage,
  } = questionGroupStore
  const { isQuestionGroupLoading, isQuestionListLoading } = loadingStore
  return {
    questionGroup,
    getQuestionList,
    getQuestionGroup,
    questionList,
    nextReleaseTime,
    isQuestionGroupLoading,
    isQuestionListLoading,
    redirectToSettings,
    activeKey,
    setActiveKey,
    successMessage,
    errorMessage,
  }
})
@observer
class QuestionGroupPage extends Component {
  constructor(props) {
    super(props)
    this.renderQuestionGroup = this.renderQuestionGroup.bind(this)
    this.renderTabs = this.renderTabs.bind(this)
    this.onTabSelect = this.onTabSelect.bind(this)
  }

  static propTypes = {
    questionGroup: MobxPropTypes.observableArray,
    questionList: MobxPropTypes.observableArray,
    activeKey: PropTypes.number.isRequired,
    setActiveKey: PropTypes.func.isRequired,
    isQuestionGroupLoading: PropTypes.bool.isRequired,
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

  onTabSelect(key) {
    this.props.setActiveKey(key)
  }

  renderQuestionGroup() {
    const {
      questionGroup,
      questionList,
      isQuestionListLoading,
      redirectToSettings,
    } = this.props
    return _.map(questionGroup, (g) => {
      return (
        <Tab
          key={g.groupType}
          eventKey={g.groupType}
          title={g.groupName}>
          <QuestionList
            redirectToSettings={redirectToSettings}
            groupType={g.groupType}
            questionList={questionList}
            isLoading={isQuestionListLoading}
          />
        </Tab>)
    })
  }

  renderTabs() {
    const { activeKey } = this.props
    return(
      <Tabs
        defaultActiveKey={activeKey}
        id='question-group-tabs'
        onSelect={this.onTabSelect}
      >
        {this.renderQuestionGroup()}
      </Tabs>)
  }
  render() {
    const { isQuestionGroupLoading, nextReleaseTime } = this.props
    return (
      <div>
        <h3>题目</h3>
        <AlertMessage bsStyle='danger' message={this.props.errorMessage}/>
        <AlertMessage bsStyle='success' message={this.props.successMessage}/>
        {isQuestionGroupLoading? <h3>Loading...</h3> : this.renderTabs()}
        {nextReleaseTime && `下一组题发布时间: ${nextReleaseTime}`}
      </div>
    )
  }
}

export default QuestionGroupPage