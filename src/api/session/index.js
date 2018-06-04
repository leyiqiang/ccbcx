import { axios } from 'src/api/axios'

const SESSION_API = '/api/session'
const USER_INFO = SESSION_API + '/info'

export const getUserInfo = async function() {
  return await axios.get(USER_INFO)
}