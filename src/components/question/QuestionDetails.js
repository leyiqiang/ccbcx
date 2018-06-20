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
      questionContent: this.props.questionContent,
    }
    this.onQuestionAnswerChange = this.onQuestionAnswerChange.bind(this)
    this.onSubmitAnswer = this.onSubmitAnswer.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  static propTypes = {
    questionNumber: PropTypes.string,
    questionContent: PropTypes.string,
    redirectToQuestionList: PropTypes.func.isRequired,
    submitAnswer: PropTypes.func.isRequired,
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

  render() {
    return(
      <div>
        <Label for='questionGroupName'>题目内容:</Label>
        <div className='border' onClick={this.focus}>
          <ReactQuill
            value={this.state.questionContent}
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
        <Button onClick={this.onSubmitAnswer}>提交</Button>
        <Button color='danger' onClick={this.onCancel}>返回</Button>
      </div>
    )
  }
}

export default QuestionDetails