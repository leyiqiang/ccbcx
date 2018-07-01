import React, { Component } from 'react'
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import AlertMessage from '../../components/AlertMessage'
import _ from 'lodash'


@inject(stores => {
  const { newsStore, loadingStore } = stores
  const { isNewsListLoading } = loadingStore
  const { getNews, successMessage, errorMessage, newsList } = newsStore
  return {
    successMessage,
    errorMessage,
    getNews,
    newsList,
    isNewsListLoading,
  }
})
@observer
class NewsPage extends Component {
  constructor(props) {
    super(props)
    this.renderNewsList = this.renderNewsList.bind(this)
    this.onMessageChange = this.onMessageChange.bind(this)
    this.state = {
      message: '',
    }
  }

  static propTypes = {
    successMessage: PropTypes.string,
    errorMessage: PropTypes.string,
    getNews: PropTypes.func.isRequired,
    isNewsListLoading: PropTypes.bool.isRequired,
    newsList: MobxPropTypes.observableArray,
  }

  componentWillMount() {
    this.props.getNews()
  }

  onMessageChange(e) {
    e.preventDefault()
    this.setState({
      message: e.target.value,
    })
  }

  renderNewsList() {
    const {
      newsList,
      isNewsListLoading,
    } = this.props
    const newsListView = _.map(newsList, (n) => {
      return (
        <li key={n._id} className='list-group-item'>
          <h5>{n.createdAt}</h5>
          <p>{n.message}</p>
        </li>
      )
    })
    if (isNewsListLoading) {
      return <h3>Loading...</h3>
    }

    return <ul className='list-group'>{newsListView}</ul>
  }


  render() {
    return (
      <div>
        <AlertMessage bsStyle='danger' message={this.props.errorMessage}/>
        <AlertMessage bsStyle='success' message={this.props.successMessage}/>
        {this.renderNewsList()}
      </div>
    )
  }
}

export default NewsPage