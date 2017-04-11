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

  loginClicked = () => {
    window.location.href = '/api/auth/google';
  }

  
  render() {      
    return (      
      <Modal show={this.props.show} onHide={this.hideModal} bsSize="small" backdrop="static">
        <Modal.Header>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
            <button class="btn btn-danger btn-block" onClick={this.loginClicked} type="submit"><i class="fa fa-google-plus" /> Log in with Google</button>          
            <Button class="btn btn-block" onClick={this.closeModal}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default connect(mapStoreStateToProps)(LoginModal)
