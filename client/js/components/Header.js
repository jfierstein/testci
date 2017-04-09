'use strict';

import { Button, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import { fetchBuildInfo } from 'actions/buildInfoActions';


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

  render() {

    const { buildInfo } = this.props;
    return (
      <div>
        <header>        
          <div className="buildInfo">
            Release <strong>{buildInfo ? `${buildInfo.BuildNumber}` : 'Unknown'}</strong>
            <br />
            Environment <strong>{buildInfo ? `${buildInfo.Environment}` : 'Unknown'}</strong>
          </div>
        </header>
      </div>
    );
  }

}

export default connect(mapStoreStateToProps)(Header);