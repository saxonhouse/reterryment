import React, { Component } from 'react';
import { Container, Provider, Flex, Box, Heading } from 'rebass';
import posed from 'react-pose';
import AppHeader from './AppHeader';
import PostList from './PostList';
import BlogPost from './BlogPost';
import NewPost from './NewPost';
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
const AppDiv = posed.div({
  out: {},
  in: {staggerChildren: 100},
  })


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {pose: 'out'}
  }

  componentDidMount() {
    this.setState({pose: 'in'})
  }

  render() {
    if (!this.props.loggedIn) {
      return (
        <Redirect to='/login' />
      )
    }
    return (
      <AppDiv pose={this.state.pose} className="App">
        <Container >
            <AppHeader newPost={this.props.newPost} />
            {this.props.newPost ? <NewPost match={this.props.match} /> : this.props.list ? <PostList match={this.props.match} author={this.props.author} draft={this.props.draft} /> : <BlogPost match={this.props.match} draft={this.props.draft}/> }
        </Container>
      </AppDiv>
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
