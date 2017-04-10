'use strict';

import { combineReducers } from 'redux';


import buildInfo from 'reducers/buildInfoReducer';
import images from 'reducers/imagesReducer';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  buildInfo,
  images,
  routing: routerReducer,
});