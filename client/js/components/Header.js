'use strict';

import { Button, Row, Col, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';

import { getAuthStatus } from 'actions/userActions';

import LoginModal from 'components/modals/LoginModal'
import AboutModal from 'components/modals/AboutModal'
import { hashHistory } from 'react-router';

function mapStoreStateToProps(store) {
  return {
    user: store.user
  }
}

class Header extends React.Component {

   constructor(props) {
    super(props);
    this.state = {
      showAboutModal : false
    };
  }

  componentWillMount() {
    this.props.dispatch(getAuthStatus());
  }

  homeClicked = () => {
    hashHistory.push('/');
  }

  imagesClicked = () => {
    hashHistory.push('/images');
  }

  deploymentsClicked = () => {
    hashHistory.push('/deployments');
  }

  aboutClicked = () => {
    this.setState({
      ...this.state,
      showAboutModal: true
    });
  }

  closeAboutModal = () => {
     this.setState({
      ...this.state,
      showAboutModal: false
    });
  }

  loginClicked = () => {
    this.setState({
      ...this.state,
      showLoginModal: true
    });
  }

  closeLoginModal = () => {
     this.setState({
      ...this.state,
      showLoginModal: false
    });
  }

  logoutClicked = () => {
    window.location.href = '/api/auth/logout';
  }


  render() {
    const { user } = this.props;
    return (
      <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Test CI</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              { this.state.showAboutModal  ? <AboutModal show={this.state.showAboutModal}  close={this.closeAboutModal} /> : null }              
              <NavItem onClick={this.aboutClicked}><i style={{ marginRight : 5}} className="fa fa-info-circle" />About</NavItem>
              { this.state.showLoginModal  ? <LoginModal show={this.state.showLoginModal}  close={this.closeLoginModal} /> : null }        
              <NavItem onClick={user.loggedIn ? this.logoutClicked : this.loginClicked }><i style={{ marginRight : 5}} className={user.loggedIn ? "fa fa-sign-out" : "fa fa-sign-in"} />{user.loggedIn ? "Logout" : "Login"}</NavItem>
            </Nav>
            <Nav>
              <NavItem onClick={this.homeClicked}>Home</NavItem>
              {user.loggedIn ? <NavItem onClick={this.imagesClicked}>Images</NavItem> : null }
              {user.loggedIn ? <NavItem onClick={this.deploymentsClicked}>Deployments</NavItem> : null }
            </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

}

export default connect(mapStoreStateToProps)(Header);