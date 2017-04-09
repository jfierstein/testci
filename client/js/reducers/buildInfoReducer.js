'use strict';

import types from 'actions/types';

export default function reducer(state = {
  fetching: false,
  fetched: false,
  error: null,
  info: null,
}, action) {

  switch (action.type) {
    case types.FETCH_BUILD_INFO: {
      return {
        ...state,
        fetching: true,
      }
    }
    case types.FETCH_BUILD_INFO_REJECTED: {
      return {
        ...state,
        fetching: false,
        error: action.payload.response.data,
      }
    }
    case types.FETCH_BUILD_INFO_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        info: action.payload,
      }
    }
  }
  return state;
  
}
