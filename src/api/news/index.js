import { axios } from 'src/api/axios'


const NEWS_API = '/api/news'
const NEWS_LIST = NEWS_API + '/list'
const NEWS_LATEST = NEWS_API + '/latest'

export const getNews = async function() {
  return await axios.get(NEWS_LIST)
}

export const getLatestNews = async function() {
  return await axios.get(NEWS_LATEST)
}