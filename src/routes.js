import React, {Component} from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Login';
import Logout from './Logout';
import App from './App';


export class Routes extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Switch>
        <Route exact path='/' render={({match}) => (
          <App list={true } match={match} {...this.props} />
        )}/>
        <Route path='/p/:page' render={({match}) => (
          <App list={true} match={match} {...this.props} />
        )}/>
        <Route path='/post/:id' render={({match}) => (
          <App match={match} {...this.props} />
        )}/>
        <Route exact path='/my-drafts' render={({match}) => (
          <App match={match} list={true} draft={true} {...this.props} />
        )}/>
        <Route path='/my-drafts/:page' render={({match}) => (
          <App list={true} draft={true} match={match} {...this.props} />
        )}/>
        <Route exact path='/draft/:id' render={({match}) => (
          <App match={match} draft={true} {...this.props} />
        )}/>
        <Route path='/new-post' render={({match}) => (
          <App match={match} newPost={true} {...this.props} />
        )}/>
        <Route path='/author/:name' render={({match}) => (
          <App match={match} author={true} list={true} {...this.props} />
        )}/>
        <Route path='/login' component={Login} />
        <Route path='/logout' component={Logout} />
      </Switch>
    )
  }
}
