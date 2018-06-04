import axiosClass from 'axios'
import { API_END_POINT } from 'src/data/api'
import {getXAccessTokenFromCookie} from 'src/util'

export const axios = axiosClass.create({
  baseURL: API_END_POINT,
  headers: {
    'x-access-token': getXAccessTokenFromCookie(),
  },
})
