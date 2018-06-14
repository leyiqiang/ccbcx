import { observable, action } from 'mobx'
import loadingStore from '../loading'
import {getErrorMessage} from 'src/util'
import {getQuestion} from 'src/api/question'
import routing from '../routing'
import _ from 'lodash'
import { QUESTION_LIST} from '../../data/route'
// import { setXAccessToken } from 'src/util'

class QuestionStore {
  @observable errorMessage = null
  @observable question = null
  @observable successMessage = null

  constructor () {
  }

  @observable async getQuestion({ questionNumber }) {
    self.errorMessage = null
    self.question = null
    self.successMessage = null
    loadingStore.isQuestionInfoLoading = true
    try {
      const res = await getQuestion({ questionNumber })
      self.question = res.data

    } catch (err) {
      self.errorMessage = getErrorMessage(err)
      self.successMessage = null
    }
    loadingStore.isQuestionInfoLoading = false

  }

  @observable redirectToQuestionList() {
    routing.history.push(QUESTION_LIST)
  }
}

const self = new QuestionStore()

export default self