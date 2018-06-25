import { observable, action } from 'mobx'
import loadingStore from '../loading'
import {getErrorMessage} from 'src/util'
import {getQuestion, submitAnswer, getProgress} from 'src/api/question'
import routing from '../routing'
import _ from 'lodash'
import {OFFICE_LIST, QUESTION_LIST} from '../../data/route'
// import { setXAccessToken } from 'src/util'

class QuestionStore {
  @observable errorMessage = null
  @observable question = null
  @observable successMessage = null
  @observable progress = null

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
      await self.getProgress({ questionNumber })
    } catch (err) {
      self.errorMessage = getErrorMessage(err)
      self.successMessage = null
      self.question = null
      self.progress = null
    }
    loadingStore.isQuestionInfoLoading = false
  }

  @observable async submitAnswer({ questionNumber, answer}) {
    self.errorMessage = null
    self.successMessage = null
    if(answer === '') {
      self.errorMessage = '答案不能为空'
      return
    }
    try {
      const res = await submitAnswer({ questionNumber, answer})
      self.successMessage = res.data.message
      self.getProgress({questionNumber})
    } catch (err) {
      self.errorMessage = getErrorMessage(err)
      self.successMessage = null
    }
  }

  @observable async getProgress({ questionNumber }) {
    try {
      self.progress = null
      const res = await getProgress({ questionNumber })
      if (res.data !== '') {
        const progress = res.data
        self.progress = progress
      }
    } catch (err) {
      self.errorMessage = getErrorMessage(err)
      self.successMessage = null
    }
  }
  @observable redirectToOfficeQuestionList() {
    routing.history.push(OFFICE_LIST)
  }

  @observable redirectToQuestionList() {
    routing.history.push(QUESTION_LIST)
  }
}

const self = new QuestionStore()

export default self