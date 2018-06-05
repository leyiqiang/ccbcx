import React, { Component } from 'react'
class Footer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className="footer-copyright text-center py-3">
          <hr/>
          <p>点击
            <a href="https://github.com/leyiqiang/ccbcx/issues">这里
            </a>
            提交bug/建议
          </p>
        </div>
      </div>
    )
  }
}
export default Footer