import React, { Component } from 'react';
import { Container, Provider, Flex, Box, Heading } from 'rebass';
import AppHeader from './AppHeader';
import { AppBody } from './AppBody';
import BlogHome from './BlogHome';
import BlogPost from './BlogPost';
import { injectGlobal } from 'styled-components'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { setUser } from './reducer'


injectGlobal`
  * { box-sizing: border-box; }
  body, html {height:100%;}
  body { margin: 0; }
`


class App extends Component {

  render() {
    if (!this.props.loggedIn) {
      return (
        <Redirect to='/login' />
      )
    }
    return (
      <div className="App">
        <Container  >
            <AppHeader />
            {this.props.children}
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn,
    user: state.user
  };
};

function mapDispatchToProps(dispatch) {
  return (
    bindActionCreators({setUser: setUser}, dispatch)
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
