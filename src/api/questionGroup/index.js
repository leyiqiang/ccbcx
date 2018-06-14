import { axios } from 'src/api/axios'
import {buildParamURI} from 'src/util'
// import { buildParamURI } from 'src/util/index'

const QUESTION_GROUP_API = '/api/questionGroup'

// const PARAM_GROUP_TYPE = ':groupType'

const QUESTION_GROUP_LIST = QUESTION_GROUP_API + '/list'


// const putGroupInfoUri = function({ groupType }) {
//   return buildParamURI({
//     originalURI: UPDATE_QUESTION_GROUP,
//     paramName: PARAM_GROUP_TYPE,
//     substitutedValue: groupType,
//   })
// }

// export const getGroupInfo = async function({ groupName }) {
//   const uri = getGroupInfoUri({ groupName })
//   return await axios.get(uri)
// }

export const getQuestionGroup = async function() {
  return await axios.get(QUESTION_GROUP_LIST)
}
