import React, { Component } from 'react'
import { observer, PropTypes as MobxPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import {Button, Label, Input} from 'reactstrap'
import _ from 'lodash'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const modules = {
  toolbar: false,
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}
@observer
class QuestionDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      answer: '',
    }
    this.onQuestionAnswerChange = this.onQuestionAnswerChange.bind(this)
    this.onSubmitAnswer = this.onSubmitAnswer.bind(this)
    this.renderProgress = this.renderProgress.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  static propTypes = {
    questionNumber: PropTypes.string,
    questionContent: PropTypes.string,
    hint1: PropTypes.string,
    hint2: PropTypes.string,
    hint3: PropTypes.string,
    redirectToQuestionList: PropTypes.func.isRequired,
    submitAnswer: PropTypes.func.isRequired,
    progress: PropTypes.object,
  }


  onQuestionAnswerChange(e) {
    e.preventDefault()
    this.setState({
      answer: e.target.value,
    })
  }
  onSubmitAnswer() {
    const { submitAnswer, questionNumber } = this.props
    submitAnswer({questionNumber, answer: this.state.answer})
  }

  onCancel() {
    this.props.redirectToQuestionList()
  }

  renderProgress() {
    const {progress} = this.props
    let completeString
    if(!_.isNil(progress)) {
      if(!_.isNil(progress.completeTime)) {
        completeString = <p>You already completed this question</p>
      }
      const answerHistory = _.join(progress.answerHistory, ', ')
      return(<div>
        {completeString}
        {answerHistory && <div>
          <Label for='answer history'>answer history:&nbsp;</Label>
          {answerHistory}
        </div>}
      </div>)
    }
  }

  render() {
    const { questionContent, hint1, hint2, hint3 } = this.props
    return(
      <div>
        <Label for='questionGroupName'>题目内容:</Label>
        <div className='border' onClick={this.focus}>
          <ReactQuill
            value={questionContent}
            modules={modules}
            readOnly={true}
          />
        </div>
        <Label for='questionReleaseTime'>答案:</Label>
        <Input
          type='text'
          name='questionAnswer'
          onChange={this.onQuestionAnswerChange}
          value={this.state.answer}
        />
        {hint1 && <div>
          <Label for='hint1'>hint1:&nbsp;</Label>{hint1}
        </div>}
        {hint2 && <div>
          <Label for='hint2'>hint2:&nbsp;</Label>{hint2}
        </div>}
        {hint3 && <div>
          <Label for='hint3'>hint3:&nbsp;</Label>{hint3}
        </div>}
        {this.renderProgress()}
        <Button onClick={this.onSubmitAnswer}>提交</Button>
        <Button color='danger' onClick={this.onCancel}>返回</Button>
      </div>
    )
  }
}

export default QuestionDetails