import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav } from 'reactstrap'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { ROOT, USER } from 'src/data/route/index'
import _ from 'lodash'


@inject(stores => {
  const { sessionStore } = stores
  const { userInfo } = sessionStore

  return {
    userInfo,
  }
})
@observer
class NavBar extends Component {

  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.onSignOut = this.onSignOut.bind(this)
    this.state = {
      isOpen: false,
    }
  }

  onSignOut() {
    this.props.logout()
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand>CCBCX</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              <Link to={ROOT}>
                <Button>题目</Button>
              </Link>
            </Nav>
            <Nav navbar>
              <Link to={ROOT}>
                <Button>官方消息</Button>
              </Link>
            </Nav>
            <Nav navbar>
              <Link to={USER}>
                <Button>我的队伍</Button>
              </Link>
            </Nav>
          </Collapse>
          <Button className={'pull-right'} bsStyle='danger' onClick={this.onSignOut}>
            退出
          </Button>
        </Navbar>
      </div>
    )
  }
}

export default NavBar