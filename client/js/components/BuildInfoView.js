'use strict';

import { Button, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import { fetchBuildInfo } from 'actions/buildInfoActions';


function mapStoreStateToProps(store) {
  return {
    buildInfo: store.buildInfo.info
  }
}

class BuildInfoView extends React.Component {

   constructor(props) {
    super(props);
    this.state = {};
  };

  componentWillMount() {
    this.props.dispatch(fetchBuildInfo());
  }

  render() {

    const buildInfo = this.props.buildInfo ||  { Environment: "Unknown" , BuildNumber : "Unknown" };
    return (
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
    );
  }

}

export default connect(mapStoreStateToProps)(BuildInfoView);