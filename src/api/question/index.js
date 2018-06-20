import { axios } from 'src/api/axios'
import {buildParamURI} from 'src/util'

const PARAM_QUESTION_NUMBER = ':questionNumber'

const QUESTION_API = '/api/question'

const QUESTION_LIST = QUESTION_API + '/list'

const QUESTION_INFO = QUESTION_API + '/' + PARAM_QUESTION_NUMBER

const SUBMIT_ANSWER = QUESTION_API + '/answer'

const PROGRESS_INFO = QUESTION_API + '/progress/' + PARAM_QUESTION_NUMBER

const getQuestionUri = function({ questionNumber }) {
  return buildParamURI({
    originalURI: QUESTION_INFO,
    paramName: PARAM_QUESTION_NUMBER,
    substitutedValue: questionNumber,
  })
}

const getProgressUri = function({ questionNumber }) {
  return buildParamURI({
    originalURI: PROGRESS_INFO,
    paramName: PARAM_QUESTION_NUMBER,
    substitutedValue: questionNumber,
  })
}


export const getQuestionList = async function() {
  return await axios.get(QUESTION_LIST)
}

export const submitAnswer = async function({questionNumber, answer}) {
  return await axios.post(SUBMIT_ANSWER, { questionNumber, answer})
}
export const getQuestion = async function({ questionNumber }) {
  const uri = getQuestionUri({ questionNumber })
  return await axios.get(uri)
}

export const getProgress = async function({ questionNumber }) {
  const uri = getProgressUri({ questionNumber })
  return await axios.get(uri)
}