'use strict';

import axios from 'axios';
import types from 'actions/types';

export function fetchBuildInfo() {
  return function(dispatch) {
    dispatch({type: types.FETCH_BUILD_INFO, payload: null});
    axios.get(`/api/build-info`)
      .then(response => {
        dispatch({type: types.FETCH_BUILD_INFO_FULFILLED, payload: response.data});
      })
      .catch(err => {
        dispatch({type: types.FETCH_BUILD_INFO_REJECTED, payload: err});
      });
  }
}