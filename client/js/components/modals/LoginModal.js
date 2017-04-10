'use strict';

import { Modal, Button, ButtonToolbar, MenuItem, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

const mapStoreStateToProps = (store) => {
  return {};
}

class LoginModal extends React.Component {
 
  constructor(props) {
    super(props);
  }

  hideModal = (e) => {
    this.props.hide();
  }

  closeModal = () => {
    this.props.close();
  }

  
  render() {      
    return (      
      <Modal show={this.props.show} onHide={this.hideModal} bsSize="small" backdrop="static">
        <Modal.Header>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form class="form-signin">
            <label for="inputEmail" class="sr-only">Email address</label>
            <input style={{marginBottom : 5}} type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus />
            <label for="inputPassword" class="sr-only">Password</label>
            <input type="password" id="inputPassword" class="form-control" placeholder="Password" required />
            
          </form>
        </Modal.Body>
        <Modal.Footer>
            <Button class="btn btn-block" onClick={this.closeModal}>Cancel</Button>
            <button class="btn btn-primary btn-block" type="submit">Sign in</button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default connect(mapStoreStateToProps)(LoginModal)
