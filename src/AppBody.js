import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import BlogHome from './BlogHome';
import BlogPost from './BlogPost';

import './App.css';

export const AppBody = () => (
  <main>
    <Switch>
      <Route exact path='/' render={(props) => (
        <BlogHome {...props} />
      )}/>
      <Route path='/post/:id' render={(props) => (
        <BlogPost {...props} />
      )}/>
      <Route path='/p/:page' render={(props) => (
        <BlogHome {...props} />
      )}/>
      <Redirect from='*' to='/' />
    </Switch>
  </main>
)
