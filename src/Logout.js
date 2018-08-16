import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setUser } from './reducer'

class Logout extends Component {
  componentWillMount() {
    this.props.setUser()
    localStorage.setItem('user', null)
  }

  render() {
    return (
    <Redirect to='/' />
  )
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn,
    user: state.user,
  };
};

function mapDispatchToProps(dispatch) {
  return (
    bindActionCreators({setUser: setUser}, dispatch)
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
