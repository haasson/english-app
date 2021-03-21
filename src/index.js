import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from './store/rootReducer'
import thunk from 'redux-thunk'
import firebase from 'firebase'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'firebase/auth'
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {appConfig} from "./appConfig";

const composeEnhancers =
  typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({

    }) : compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

firebase.initializeApp(appConfig.firebaseConfig)

export const AuthContext = createContext(null)
const auth = firebase.auth()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthContext.Provider value={auth}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthContext.Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

