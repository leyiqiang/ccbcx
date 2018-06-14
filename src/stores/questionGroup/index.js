import { action, observable } from 'mobx'
import loadingStore from '../loading'
import {getErrorMessage} from 'src/util'
import {getQuestionGroup} from 'src/api/questionGroup'
import {getQuestionList} from 'src/api/question'
import _ from 'lodash'
import moment from 'moment'
import {PARAM_QUESTION_ID, QUESTION_DETAILS} from 'src/data/route/index'
import {buildParamURI} from '../../util/index'
import routing from '../routing'

// const GROUP_ONE = 1
// const GROUP_TWO = 2
// const GROUP_THREE = 3
// const GROUP_META = 4

class QuestionGroupStore {
  @observable questionGroup = null
  @observable isQuestionGroupsLoading = true
  @observable errorMessage= null
  @observable successMessage = null
  @observable activeKey = 1
  @observable questionList = null
  @observable nextReleaseTime = null

  @action setActiveKey(key) {
    self.activeKey = key
  }

  @action clearQuestionGroupList() {
    self.questionGroup = null
  }
  getGroupByType(type) {
    const group = _.find(self.questionGroup, (g) => {
      return g.groupType === type
    })
    if(!_.isNil(group.releaseTime)) {
      group.releaseTime = moment.utc(group.releaseTime).local()
    }
    return group
  }


  @action async getQuestionGroup() {
    self.clearQuestionGroupList()
    loadingStore.isQuestionGroupLoading = true
    try {
      self.errorMessage = null
      const res = await getQuestionGroup()
      const {questionGroupList, nextReleaseTime} = res.data
      const questionGroupWithLocale = _.map(questionGroupList, (g) => {
        const releaseTime = g.releaseTime
        g.releaseTime = moment.utc(releaseTime).local()
        return g
      })
      if (!_.isNil(nextReleaseTime)) {
        const dateFormat = 'YYYY年MM月DD日 HH:mm:ss'
        self.nextReleaseTime = moment.utc(nextReleaseTime).local().format(dateFormat)
      }
      self.questionGroup = questionGroupWithLocale
    } catch (err) {
      self.clearQuestionGroupList()
      self.errorMessage = getErrorMessage(err)
    }
    loadingStore.isQuestionGroupLoading = false

  }

  @action async getQuestionList() {
    loadingStore.isQuestionListLoading = true
    try {
      self.errorMessage = null
      const res = await getQuestionList()
      const unsortedQuestionList = res.data
      const groupedQuestionList = _.sortBy(unsortedQuestionList,
        q => parseInt(q.questionNumber.split('-')[0]))
      self.questionList = _.sortBy(groupedQuestionList,
        q => parseInt(q.questionNumber.split('-')[1]))
    } catch(err) {
      self.clearQuestionGroupList()
      self.errorMessage = getErrorMessage(err)
    }
    loadingStore.isQuestionListLoading = false
  }

  @action redirectToSettings({ questionNumber }) {
    let redirectedURI = buildParamURI({
      originalURI: QUESTION_DETAILS,
      paramName: PARAM_QUESTION_ID,
      substitutedValue: questionNumber,
    })
    routing.history.push(redirectedURI)
  }

}

const self = new QuestionGroupStore()

export default self