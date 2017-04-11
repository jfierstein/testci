'use strict';

import axios from 'axios';
import types from 'actions/types';

export function getAuthStatus() {
  return function(dispatch) {
    axios.get(`/api/auth/status`)
      .then(response => {
        dispatch({type: types.SET_AUTH_STATUS, payload: { user: response.data, loggedIn: true } });
      })
      .catch(err => {
        dispatch({type: types.SET_AUTH_STATUS, payload: { user: null, loggedIn: false } });
      });
  }
}