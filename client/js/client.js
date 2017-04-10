'use strict';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import Header from 'components/Header';
import HomeView from 'components/HomeView';
import ImagesView from 'components/ImagesView';
import store from 'store';

const app = document.getElementById('app');

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <div>
    <Provider store={store}>
      <div>
          <Header/>
          <Router history={history}>
            <Route path="/" component={HomeView}>
            </Route>        
            <Route path="/images" component={ImagesView}>
            </Route>          
          </Router>
      </div>
    </Provider>
  </div>
  , app);
