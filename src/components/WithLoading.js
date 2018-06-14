import React from 'react'
import PropTypes from 'prop-types'

const WithLoading = (Component) => {
  const WithLoadingComponent = ({ isLoading, ...props }) => {
    if (!isLoading) {
      return (<Component {...props} />)
    }
    return (<h3>Loading...</h3>)
  }
  WithLoadingComponent.propTypes = {
    isLoading: PropTypes.bool,
  }
  return WithLoadingComponent
}

export default WithLoading