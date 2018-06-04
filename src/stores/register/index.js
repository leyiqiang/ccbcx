import { action, observable } from 'mobx'
import { setXAccessToken } from 'src/util'
import { signUp } from 'src/api/auth'
import sessionStore from '../session'
import _ from 'lodash'

class RegisterStore {
  @observable userName = ''
  @observable password = ''
  @observable nickName = ''
  @observable confirmPassword = ''
  @observable errorMessage = null

  constructor() {
  }

  @action setUserName(userName) {
    self.userName = userName
  }

  @action setPassword(password) {
    self.password = password
  }

  @action setConfirmPassword(password) {
    self.confirmPassword = password
  }

  @action setNickName(nickName) {
    self.nickName = nickName
  }

  @action resetForm() {
    self.userName = ''
    self.password = ''
    self.nickName = ''
    self.confirmPassword = ''
    self.errorMessage = null
  }

  @action async register() {
    if (self.validate()) {
      try {
        const res = await signUp({
          userName: self.userName,
          nickName: self.nickName,
          password: self.password,
        })
        setXAccessToken(res.data.token)
        self.resetForm()
        await sessionStore.getUserInfo()
      } catch (err) {
        self.setErrorMessage(err)
      }
    }
  }

  @action validate() {
    self.errorMessage = null
    const regex = /^[a-z0-9]+$/i
    if (self.userName.length < 3 ||
        self.userName.length >30 ||
        !self.userName.match(regex)
    ) {
      self.errorMessage = 'Invalid username'
      return false
    }
    // if (self.nickName.length < 3 || self.nickName.length >30) {
    //   self.errorMessage = 'Invalid nickname'
    //   return false
    // }
    if (self.password.length <= 0) {
      self.errorMessage = 'Password cannot be empty'
      return false
    }
    if (self.password !== self.confirmPassword) {
      self.errorMessage = 'Password does not match'
      return false
    }
    return true
  }

  @action setErrorMessage(err) {
    self.errorMessage = null
    if (!_.isNil(err.response)) {
      self.errorMessage = err.response.data.message
    } else {
      self.errorMessage = err.message
    }
  }
}

const self = new RegisterStore()

export default self