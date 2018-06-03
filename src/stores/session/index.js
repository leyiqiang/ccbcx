import { action, observable } from 'mobx'
import { getUserInfo } from 'src/api/auth'
import { setXAccessToken } from 'src/util'

class Session {
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
      const res = getUserInfo()
      self.userInfo = res.data
      return res.data
    } catch (err) {
      setXAccessToken(null)
    }
  }
}

const self = new Session()

export default self