import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  NavLink} from 'reactstrap'
import { Link } from 'react-router-dom'
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
    this.state = {
      isOpen: false,
    }
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
              <Link to={'/'}>
                <Button>Test</Button>
              </Link>
            </Nav>
            <Nav navbar>
              <Link to={'/'}>
                <Button>Test</Button>
              </Link>
            </Nav>
            <Nav navbar>
              <Link to={'/'}>
                <Button>Test</Button>
              </Link>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

export default NavBar