'use strict';

import types from 'actions/types';

export default function reducer(state = {
  fetching: false,
  fetched: false,
  error: null,
  images: null,
}, action) {

  switch (action.type) {
    case types.FETCH_TAGGED_IMAGES: {
      return {
        ...state,
        fetching: true,
      }
    }
    case types.FETCH_TAGGED_IMAGES_REJECTED: {
      return {
        ...state,
        fetching: false,
        error: action.payload.response.data,
      }
    }
    case types.FETCH_TAGGED_IMAGES_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        images: action.payload,
      }
    }
  }
  return state;
  
}
