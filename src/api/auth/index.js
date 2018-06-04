import { axios } from 'src/api/axios'

const AUTH_API = '/api/auth'

const SIGN_IN = AUTH_API + '/signIn'

export const signIn = async function({ userName, password }) {
  return await axios.post(SIGN_IN, {
    userName,
    password,
  })
}