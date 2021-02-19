import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from './store/rootReducer'
import thunk from 'redux-thunk'
import firebase from 'firebase'
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const composeEnhancers =
  typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

const firebaseConfig = {
  apiKey: "AIzaSyAzEmGYG1x_6BGgkdYJgj6lAM_n-lToXGE",
  authDomain: "vue-english-project.firebaseapp.com",
  databaseURL: "https://vue-english-project.firebaseio.com",
  projectId: "vue-english-project",
  storageBucket: "vue-english-project.appspot.com",
  messagingSenderId: "314146019463",
  appId: "1:314146019463:web:52dd56edd053ac95134022"
};

firebase.initializeApp(firebaseConfig)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

