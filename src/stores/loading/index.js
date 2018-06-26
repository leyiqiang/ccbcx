import { action, observable } from 'mobx'
// import { setXAccessToken } from 'src/util'
// import { signIn } from 'src/api/auth'
// import sessionStore from 'src/stores/session'

class LoadingStore {
  @observable isUserInfoLoading = true;
  @observable isQuestionGroupLoading = true;
  @observable isQuestionListLoading = true;
  @observable isQuestionInfoLoading = true;
  @observable isGroupInfoLoading = true;
  @observable isOfficeQuestionListLoading = true;
  @observable isOfficeQuestionLoading = true;
  @observable isNewsListLoading = true;
  constructor () {
  }
}

const self = new LoadingStore()

export default self