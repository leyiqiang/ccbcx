import { action, observable } from 'mobx'
import { getUserInfo } from 'src/api/session'
import { setXAccessToken } from 'src/util'
import routingStore from '../routing'

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
      const res = await getUserInfo()
      self.userInfo = res.data
      return res.data
    } catch (err) {
      setXAccessToken(null)
    }
  }
}

const self = new Session()

export default self