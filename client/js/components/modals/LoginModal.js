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
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={this.closeModal}>Cancel</Button>
            <Button bsStyle="success" onClick={ this.login }>Submit</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default connect(mapStoreStateToProps)(LoginModal)
