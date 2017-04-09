'use strict';

import { combineReducers } from 'redux';

import buildInfo from 'reducers/buildInfoReducer';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  buildInfo,
  routing: routerReducer,
});