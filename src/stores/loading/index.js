import { action, observable } from 'mobx'
// import { setXAccessToken } from 'src/util'
// import { signIn } from 'src/api/auth'
// import sessionStore from 'src/stores/session'

class LoadingStore {
  @observable isUserInfoLoading = true;

  constructor () {
  }
}

const self = new LoadingStore()

export default self