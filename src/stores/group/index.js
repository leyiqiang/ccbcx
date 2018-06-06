import { action, observable } from 'mobx'
import { getErrorMessage } from 'src/util/index'
import {
  createGroup,
  getGroupInfo,
  joinGroup,
  leaveGroup,
  deleteGroup } from 'src/api/group'
import _ from 'lodash'

class GroupStore {
  @observable errorMessage = null
  @observable groupName = null
  @observable groupContact = null
  @observable invitationCode = null
  @observable memberList = []

  constructor() {
    // this.getGroupInfo()
  }

  @action clearGroupInfo() {
    self.groupName = null
    self.groupContact = null
    self.invitationCode = null
    self.memberList = null
  }

  @action async getGroupInfo() {
    self.clearGroupInfo()
    try {
      self.errorMessage = null
      const res = await getGroupInfo()
      const {groupInfo, memberList} = res.data
      if (!_.isNil(groupInfo)) {
        const {groupName, groupContact, invitationCode} = groupInfo
        self.groupName = groupName
        self.groupContact = groupContact
        self.invitationCode = invitationCode
        self.memberList = memberList
      }
    } catch (err) {
      self.clearGroupInfo()
      self.errorMessage = getErrorMessage(err)
    }


  }

  @action async createGroup({ groupName, groupContact }) {
    self.errorMessage = null
    if (self.validate({ groupName, groupContact })) {
      try {
        await createGroup({
          groupName,
          groupContact,
        })
        await self.getGroupInfo()
      } catch (err) {
        self.clearGroupInfo()
        self.errorMessage = getErrorMessage(err)
      }
    }
  }

  @action async joinGroup({ invitationCode }) {
    self.errorMessage = null
    try {
      await joinGroup({ invitationCode })
      await self.getGroupInfo()
    } catch (err) {
      self.clearGroupInfo()
      self.errorMessage = getErrorMessage(err)
    }
  }

  @action async leaveGroup() {
    self.errorMessage = null
    try {
      await leaveGroup()
      await self.getGroupInfo()
    } catch (err) {
      self.clearGroupInfo()
      self.errorMessage = getErrorMessage(err)
    }
  }

  @action async deleteGroup({ groupName }) {
    self.errorMessage = null
    try {
      await deleteGroup({ groupName })
      await self.getGroupInfo()
    } catch(err) {
      self.clearGroupInfo()
      self.errorMessage = getErrorMessage(err)
    }

  }


  @action validate({ groupName, groupContact }) {
    if (groupName.length < 1 || groupName.length > 30) {
      self.errorMessage = '非法队伍名 (长度 1-30)'
      return false
    }
    if (groupContact.length < 1 || groupContact.length > 30) {
      self.errorMessage = '非法联系方式(长度 1-30)'
      return false
    }
    return true
  }
}


const self = new GroupStore()

export default self