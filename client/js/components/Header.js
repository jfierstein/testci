'use strict';

import { Button, Row, Col, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';

import { fetchBuildInfo } from 'actions/buildInfoActions';
import LoginModal from 'components/modals/LoginModal'
import AboutModal from 'components/modals/AboutModal'
import { browserHistory } from 'react-router';


function mapStoreStateToProps(store) {
  return {
    buildInfo: store.buildInfo.info
  }
}

class Header extends React.Component {

   constructor(props) {
    super(props);
    this.state = {
      showLoginModal : false,
      showAboutModal : false
    };
  };

  componentWillMount() {
    this.props.dispatch(fetchBuildInfo());
  }

  homeClicked = () => {
    browserHistory.push('/');
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
            <Nav pullRight>
              { this.state.showAboutModal  ? <AboutModal show={this.state.showAboutModal}  close={this.closeAboutModal} /> : null }              
              <NavItem onClick={this.aboutClicked}><i style={{ marginRight : 5}} className="fa fa-info-circle" />About</NavItem>
              { this.state.showLoginModal ? <LoginModal show={this.state.showLoginModal}  close={this.closeLoginModal} /> : null }
              <NavItem onClick={this.loginClicked}><i style={{ marginRight : 5}} className="fa fa-sign-in" />Login</NavItem>
            </Nav>
            <Nav>
              <NavItem onClick={this.homeClicked}>Home</NavItem>
            </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

}

export default connect(mapStoreStateToProps)(Header);