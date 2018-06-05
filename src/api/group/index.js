import { axios } from 'src/api/axios'
import {buildParamURI} from 'src/util'
// import { buildParamURI } from 'src/util/index'

const GROUP_API = '/api/group'

const GROUP_INFO = GROUP_API + '/info'
const CREATE_GROUP = GROUP_API + '/create'
const JOIN_GROUP = GROUP_API + '/join'
// const getUserProfileURI = function({ userName }) {
//   return buildParamURI({
//     originalURI: USER_PROFILE,
//     paramName: PARAM_USERNAME,
//     substitutedValue: userName,
//   })
// }

// export const getUserProfile = async function({ userName }) {
//   const uri = getUserProfileURI({ userName })
//   return await axios.get(uri)
// }


export const createGroup = async function({ groupName, groupContact }) {
  return await axios.post(CREATE_GROUP, { groupName, groupContact })
}

export const getGroupInfo = async function() {
  return await axios.get(GROUP_INFO)
}

export const joinGroup = async function({ invitationCode }) {
  return await axios.post(JOIN_GROUP, {invitationCode})
}