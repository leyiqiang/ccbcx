import { action, observable } from 'mobx'
import { setXAccessToken, getErrorMessage } from 'src/util'
import { signIn } from 'src/api/auth'
import sessionStore from 'src/stores/session'

class AuthStore {
  @observable userName = '';
  @observable password = '';
  @observable errorMessage = null;

  constructor () {
  }

  @action setUserName(userName) {
    self.userName = userName
  }


  @action setPassword(password) {
    self.password = password
  }

  @action async login() {
    try {
      const res = await signIn({
        userName: self.userName,
        password: self.password,
      })

      setXAccessToken(res.data.token)
      await sessionStore.getUserInfo()
      self.errorMessage = null
      self.userName = ''
      self.password = ''
    } catch (err) {
      self.errorMessage = getErrorMessage(err)
    }
  }
}

const self = new AuthStore()

export default self