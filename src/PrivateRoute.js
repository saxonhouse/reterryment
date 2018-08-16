import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import Login from './Login';

const PrivateRoute = ({ component: Component, auth, ...rest }) => {

  // Add your own authentication on the below line.

  return (
    <Route
      {...rest}
      render={props =>
        auth ? (
          <Component {...props} />
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  )
}

export default PrivateRoute
