import { axios } from 'src/api/axios'

const AUTH_API = '/api/auth'

const SIGN_IN = AUTH_API + '/signIn'

const SIGN_UP = AUTH_API + '/signUp'

export const signIn = async function({ userName, password }) {
  return await axios.post(SIGN_IN, {
    userName,
    password,
  })
}

export const signUp = async function({ userName, nickName, password }) {
  return await axios.post(SIGN_UP, {
    userName,
    nickName,
    password,
  })
}