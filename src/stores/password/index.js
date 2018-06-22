import { action, observable } from 'mobx'
import { getErrorMessage } from 'src/util'
import { changePassword } from 'src/api/auth'
import _ from 'lodash'

class RegisterStore {
  @observable password = ''
  @observable confirmPassword = ''
  @observable errorMessage = null
  @observable successMessage = null

  constructor() {
  }

  @action resetForm() {
    self.password = ''
    self.confirmPassword = ''
    self.errorMessage = null
    self.successMessage = null
  }
  @action setPassword(password) {
    self.password = password
  }

  @action setConfirmPassword(password) {
    self.confirmPassword = password
  }

  @action async changePassword() {
    const { password, confirmPassword } = self
    if (self.validate({password, confirmPassword})) {
      try {
        await changePassword({
          password,
        })
        self.resetForm()
        self.successMessage = 'success'
      } catch (err) {
        self.errorMessage = getErrorMessage(err)
      }
    }
  }

  @action validate() {
    self.errorMessage = null
    if (self.password.length <= 0) {
      self.errorMessage = '密码不能为空'
      return false
    }
    if (self.password !== self.confirmPassword) {
      self.errorMessage = '密码不匹配'
      return false
    }
    return true
  }
}

const self = new RegisterStore()

export default self