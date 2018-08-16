import React, { Component } from 'react';
import {Provider, Container, Box, Heading, Text,
  Row, Input, Divider, ButtonCircle, Flex } from 'rebass';
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setUser } from './reducer'
import './App.css';

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      passowrd: '',
    };
    this.usernameChange = this.usernameChange.bind(this)
    this.passwordChange = this.passwordChange.bind(this)
    this.handleSubmut = this.handleSubmit.bind(this)
  }

  usernameChange(event) {
    this.setState({username: event.target.value})
  }

  passwordChange(event) {
    this.setState({password: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/api/login/', {
      username: this.state.username,
      password: this.state.password
    }).then((res) => {
      console.log(res)
      this.props.setUser(true, res.data.user, res.data.token)
      console.log(this.props)
      let user = {user: res.data.user, token: res.data.token}
      localStorage.setItem('user', JSON.stringify(user))
      this.setState({redirect: true})
    }
    ).catch((err) => console.log(err));
  }

  render() {
    if (this.state.redirect) {
       return <Redirect to='/' />;
    }
    return(
      <div className="background">
      <Provider>
        <Container width={1} height={1} >
          <Heading className="title" textAlign='center' pt={20} mb={80}> Login </Heading>
          <Box className='login-box' width={[1, 2/3, 1/2, 2/5]} py={2} px={3} >
            <form onSubmit={this.handleSubmit}>
              <Input mt={4} placeHolder={'Username'} onChange={this.usernameChange} />
              <Divider  />
              <Input type="password" placeHolder={'Password'} onChange={this.passwordChange} />
              <Flex justifyContent="right">
                <ButtonCircle my={3} type="submit" children="Login" />
              </Flex>
            </form>
          </Box>
        </Container>
      </Provider>
      </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)
