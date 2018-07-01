import { action, observable } from 'mobx'
import { getErrorMessage } from 'src/util'
import loadingStore from '../loading'
import _ from 'lodash'
import moment from 'moment'
import { getNews, getLatestNews } from 'src/api/news'


class NewsStore {
  @observable errorMessage = null
  @observable successMessage = null
  @observable newsList = null
  @observable latestNews = null

  constructor() {
    this.getLatestNews()
  }

  @action clearDataInfo() {
    self.errorMessage = null
    self.successMessage = null
  }

  @action async getNews() {
    self.clearDataInfo()
    loadingStore.isNewsListLoading = true
    try {
      const res = await getNews()
      const newsList = res.data
      self.newsList = _.map(newsList, (n) => {
        n.createdAt = moment.utc(n.createdAt).local().format('MM/DD/YYYY, h:mm:ss a')
        return n
      })
      loadingStore.isNewsListLoading = false
    } catch (err) {
      self.errorMessage = getErrorMessage(err)
      self.newsList = null
      loadingStore.isNewsListLoading = false
    }
  }

  @action async getLatestNews() {
    this.latestNews = null
    try {
      const res = await getLatestNews()
      if (res.data) {
        const { message }  = res.data
        this.latestNews = message
      }
    } catch (err) {
      this.errorMessage = getErrorMessage(err)
      this.latestNews = null
    }
  }
}
const self = new NewsStore()

export default self