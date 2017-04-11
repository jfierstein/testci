'use strict';

import types from 'actions/types';

export default function reducer(state = {
  loggedIn: false,
  user: null,
  error: null
}, action) {

  switch (action.type) {
    case types.SET_AUTH_STATUS: {
      return {
        ...state,
        loggedIn: action.payload.loggedIn,
        user: action.payload.user
      }
    }
  }
  return state;
  
}
