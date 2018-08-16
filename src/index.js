import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { userReducer } from './reducer'
import { Routes } from './Routes'

import App from './App';
import Login from './Login';

import 'semantic-ui-css/semantic.min.css';

import { injectGlobal } from 'styled-components'

injectGlobal`
  * { box-sizing: border-box; }
  body, html, #root {height:100%;}
  body { margin: 0; }
`
let user = localStorage.getItem('user')
user = JSON.parse(user)
let defaultStore = {}
if (user != null) {
  defaultStore= {
    loggedIn: true,
    user: user.user,
    token: user.token
  }
}

const store = createStore(userReducer, defaultStore)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,
 document.getElementById('root')
);
