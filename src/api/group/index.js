import { axios } from 'src/api/axios'
import {buildParamURI} from 'src/util'
// import { buildParamURI } from 'src/util/index'

const GROUP_API = '/api/group'

const PARAM_GROUP_NAME = ':groupName'

const GROUP_INFO = GROUP_API + '/info'
const CREATE_GROUP = GROUP_API + '/create'
const JOIN_GROUP = GROUP_API + '/join'
const LEAVE_GROUP = GROUP_API + '/leave'
const DELETE_GROUP = GROUP_API + '/delete/' + PARAM_GROUP_NAME

const getDeleteGroupUri = function({ groupName }) {
  return buildParamURI({
    originalURI: DELETE_GROUP,
    paramName: PARAM_GROUP_NAME,
    substitutedValue: groupName,
  })
}

export const createGroup = async function({ groupName, groupContact }) {
  return await axios.post(CREATE_GROUP, { groupName, groupContact })
}

export const getGroupInfo = async function() {
  return await axios.get(GROUP_INFO)
}

export const joinGroup = async function({ invitationCode }) {
  return await axios.post(JOIN_GROUP, {invitationCode})
}

export const leaveGroup = async function() {
  return await axios.delete(LEAVE_GROUP)
}

export const deleteGroup = async function({ groupName }) {
  const uri = getDeleteGroupUri({ groupName })
  return await axios.delete(uri)
}