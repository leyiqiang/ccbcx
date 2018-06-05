import { action, observable } from 'mobx'
import { getUserInfo } from 'src/api/session'
import { setXAccessToken } from 'src/util'
import loadingStore from '../loading'

class SessionStore {
  @observable userInfo = null

  constructor() {
    this.getUserInfo()
  }

  @action logout() {
    setXAccessToken(null)
    self.userInfo = null
  }

  @action async getUserInfo() {
    try {
      loadingStore.isUserInfoLoading = true
      const res = await getUserInfo()
      self.userInfo = res.data
      loadingStore.isUserInfoLoading = false
    } catch (err) {
      setXAccessToken(null)
    }
    loadingStore.isUserInfoLoading = false
  }
}

const self = new SessionStore()

export default self