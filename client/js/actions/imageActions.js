'use strict';

import axios from 'axios';
import types from 'actions/types';

export function fetchTaggedImages() {
  return function(dispatch) {
    dispatch({type: types.FETCH_TAGGED_IMAGES, payload: null});
    axios.get(`/api/docker/tagged-images`)
      .then(response => {
        dispatch({type: types.FETCH_TAGGED_IMAGES_FULFILLED, payload: response.data});
      })
      .catch(err => {
        dispatch({type: types.FETCH_TAGGED_IMAGES_REJECTED, payload: err});
      });
  }
}