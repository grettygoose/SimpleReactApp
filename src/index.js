import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import {searchRobots} from './reducers';
import {createStore} from 'redux';

const store = createStore(searchRobots)


ReactDOM.render(<App store={store}/>, document.getElementById('root'));
registerServiceWorker();
