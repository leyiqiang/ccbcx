import React, { Component } from 'react'
import { observer, PropTypes as MobxPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import 'src/styles/Grid.css'

@observer
class QuestionMap extends Component {
  constructor(props) {
    super(props)
    this.onRedirect = this.onRedirect.bind(this)

  }

  static propTypes = {
    questionList: MobxPropTypes.observableArray,
    redirectToSettings: PropTypes.func.isRequired,
  }

  onRedirect({questionNumber}) {
    const { redirectToSettings } = this.props
    redirectToSettings({questionNumber})
  }
  render() {
    const {questionList} = this.props
    const getQuestion = (x, y) => {
      const locationString = x + '-' + y
      const question = _.find(questionList, {location: locationString})
      return question
    }
    let rowItems = []
    let gridItems = []
    for(let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const key = i + '-' + j
        const question = getQuestion(i, j)
        if (!_.isNil(question)) {
          rowItems.push(
            <div onClick={() => this.onRedirect({questionNumber: question.questionNumber})} key={key}
              className='square'>
              <div className='grid-content'>
                {question.questionNumber}
              </div>
            </div>
          )
        } else {
          rowItems.push(
            <div key={key}
              className='square'>
              <div className='grid-content'>
                &nbsp;
              </div>
            </div>
          )}
      }
      gridItems.push(rowItems)
      rowItems = []
    }
    return (
      <div>
        {_.map(gridItems, row => _.map(row, (item) => {
          return item
        }))}
      </div>
    )
  }
}

export default QuestionMap