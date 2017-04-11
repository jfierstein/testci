'use strict';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem  } from  'react-bootstrap';

function mapStoreStateToProps(store) {
  return {
    user: store.user
  }
}

class DeploymentsView extends React.Component {

  render() {
    if(!this.props.user.loggedIn) return null;
    let deploymentsList = [];
    this.props.user.user.deployments.forEach((deployment) => {
        deploymentsList.push(<ListGroupItem>{deployment.name}</ListGroupItem>);
    });
    return (
      <div>
        <div className="container">
          <h3>Deployments</h3>
          <ListGroup>
              {deploymentsList}
          </ListGroup>
        </div>
      </div>
      
    );
  }

}
export default connect(mapStoreStateToProps)(DeploymentsView)
