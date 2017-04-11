'use strict';

import { Modal, Button, ButtonToolbar, MenuItem, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import { fetchBuildInfo } from 'actions/buildInfoActions';

function mapStoreStateToProps(store) {
  return {
    buildInfo: store.buildInfo.info
  }
}

class AboutModal extends React.Component {
 
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(fetchBuildInfo());
  }

  hideModal = (e) => {
    this.props.hide();
  }

  closeModal = () => {
    this.props.close();
  }

  
  render() {      
    const buildInfo = this.props.buildInfo ||  { Environment: "Unknown" , BuildNumber : "Unknown" };
    return (      
      <Modal show={this.props.show} onHide={this.hideModal} bsSize="small" backdrop="static">
        <Modal.Header>
          <Modal.Title>Build Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <div className="container">
                <p>
                <span style={{fontSize: '1.1em', fontFamily: 'Courier'}}>Environment: </span>
                <span style={{fontSize: '.8em', fontFamily: 'Courier'}}>{buildInfo.Environment}</span>
                </p>
                <p>
                <span style={{fontSize: '1.1em', fontFamily: 'Courier'}}>Build: </span>
                <span style={{fontSize: '.8em', fontFamily: 'Courier'}}>{buildInfo.BuildNumber}</span>
                </p>     
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={this.closeModal}>Ok</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default connect(mapStoreStateToProps)(AboutModal)
