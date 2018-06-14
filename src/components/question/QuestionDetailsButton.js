import React, { Component } from 'react'
import { observer, PropTypes as MobxPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import { ListGroupItem } from 'reactstrap'


@observer
class QuestionDetailsButton extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    questionNumber: PropTypes.string.isRequired,
    onRedirectToQuestionSettings: PropTypes.func.isRequired,
    isMeta: PropTypes.bool.isRequired,
  }


  render() {
    const { questionNumber, onRedirectToQuestionSettings } = this.props
    return(
      <ListGroupItem
        onClick={onRedirectToQuestionSettings}
        action>
        {questionNumber}
      </ListGroupItem>
    )
  }
}

export default QuestionDetailsButton