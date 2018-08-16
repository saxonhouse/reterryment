import React, {Component} from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute'
import Login from './Login';
import App from './App';
import BlogHome from './BlogHome';
import BlogPost from './BlogPost';
import { AppBody } from './AppBody';

export class Routes extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Switch>
        <Route exact path='/' render={(props) => (
          <App> <BlogHome {...props} /> </App>
        )}/>
        <Route path='/post/:id' render={(props) => (
          <App> <BlogPost {...props} /> </App>
        )}/>
        <Route path='/p/:page' render={(props) => (
          <App> <BlogHome {...props} /> </App>
        )}/>
        <Route exact path='/login' component={Login} />
      </Switch>
    )
  }
}
