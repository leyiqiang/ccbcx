import { axios } from 'src/api/axios'

const AUTH_API = '/api/auth'
const USER_INFO = AUTH_API + '/info'

export const getUserInfo = async function() {
  return await axios.get(USER_INFO)
}