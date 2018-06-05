import { axios } from 'src/api/axios'
import { buildParamURI } from 'src/util/index'

const USER_API = '/api/user'

const PARAM_USERNAME = ':userName'

const USER_PROFILE = USER_API + '/' + PARAM_USERNAME

const USER_CREATE_GROUP = USER_API + '/create'

const getUserProfileURI = function({ userName }) {
  return buildParamURI({
    originalURI: USER_PROFILE,
    paramName: PARAM_USERNAME,
    substitutedValue: userName,
  })
}

export const getUserProfile = async function({ userName }) {
  const uri = getUserProfileURI({ userName })
  return await axios.get(uri)
}

export const createGroup = async function({ groupName, groupContact }) {
  return await axios.post(USER_CREATE_GROUP, { groupName, groupContact })
}