'use strict';

import { Button, Row, Col, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';

import { fetchBuildInfo } from 'actions/buildInfoActions';
import {browserHistory} from 'react-router';


function mapStoreStateToProps(store) {
  return {
    buildInfo: store.buildInfo.info
  }
}

class Header extends React.Component {

   constructor(props) {
    super(props);
    this.state = {};
  };

  componentWillMount() {
    this.props.dispatch(fetchBuildInfo());
  }

  homeClicked = () => {
    browserHistory.push('/');
  }

  aboutClicked = () => {
    browserHistory.push('/build-info');
  }

  render() {

    const { buildInfo } = this.props;
    return (
      <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Test CI</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem onClick={this.homeClicked}>Home</NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem onClick={this.aboutClicked}>About</NavItem>
            </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

}

export default connect(mapStoreStateToProps)(Header);