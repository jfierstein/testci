'use strict';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem  } from  'react-bootstrap';

import { fetchTaggedImages } from 'actions/imageActions';

function mapStoreStateToProps(store) {
  return {
    images: store.images.images
  }
}

class ImagesView extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchTaggedImages());
  }

  render() {
    const dockerImages = this.props.images ? this.props.images : [];
    let imageList = [];
    dockerImages.forEach((image) => {
        imageList.push(<ListGroupItem href="#">{image.name}</ListGroupItem>);
    });
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
