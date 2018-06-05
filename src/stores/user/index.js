import { action, observable } from 'mobx'
import { getErrorMessage } from 'src/util/index'
import { createGroup } from 'src/api/user/index'


class UserStore {
  @observable errorMessage = null
  @observable groupName = ''
  @observable groupContact = ''

  //
  // @action async getUserProfile({ userName }) {
  //   self.errorMessage = null
  //   try {
  //     const res = await getUserProfile({ userName })
  //   } catch (err) {
  //     self.errorMessage = getErrorMessage(err)
  //   }
  // }

  @action setGroupName({ groupName }) {
    self.groupName = groupName
  }

  @action setGroupContact({ groupContact }) {
    self.groupContact = groupContact
  }

  @action async createGroup() {
    self.errorMessage = null
    try {
      const res = await createGroup({
        groupName: self.groupName,
        groupContact: self.groupContact,
      })
      console.log(res)
    } catch (err) {
      self.errorMessage = getErrorMessage(err)
    }
  }
}


const self = new UserStore()

export default self