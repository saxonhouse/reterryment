import React, {Component} from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Login';
import App from './App';
import PostList from './PostList';
import BlogPost from './BlogPost';
import NewPost from './NewPost';

export class Routes extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Switch>
        <Route exact path='/' render={(props) => (
          <App> <PostList {...props} /> </App>
        )}/>
        <Route path='/post/:id' render={(props) => (
          <App> <BlogPost {...props} /> </App>
        )}/>
        <Route path='/p/:page' render={(props) => (
          <App> <PostList {...props} /> </App>
        )}/>
        <Route exact path='/my-drafts' render={(props) => (
          <App> <PostList draft={true} {...props} /> </App>
        )}/>
        <Route exact path='/draft/:id' render={(props) => (
          <App> <BlogPost draft={true} {...props} /> </App>
        )}/>
        <Route path='/new-post' render={(props) => (
          <App> <NewPost {...props} /> </App>
        )}/>
        <Route path='/login' component={Login} />
      </Switch>
    )
  }
}
