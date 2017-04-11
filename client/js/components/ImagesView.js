'use strict';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem  } from  'react-bootstrap';

import { fetchTaggedImages } from 'actions/imageActions';

function mapStoreStateToProps(store) {
  return {
    images: store.images.images,
    user: store.user
  }
}

class ImagesView extends React.Component {

  componentWillMount() {
    if(this.props.user.loggedIn) this.props.dispatch(fetchTaggedImages());
  }

  render() {
    const dockerImages = this.props.images ? this.props.images : [];
    let imageList = [];
    dockerImages.forEach((image) => {
        imageList.push(<ListGroupItem>{image.name}</ListGroupItem>);
    });
    if(!this.props.user.loggedIn) return null;
    return (
      <div>
        <div className="container">
          <h3>Tagged Images</h3>
          <ListGroup>
              {imageList}
          </ListGroup>
        </div>
      </div>
      
    );
  }

}
export default connect(mapStoreStateToProps)(ImagesView)
