import React, { Component } from 'react';
import { Container, Provider, Flex, Box, Heading } from 'rebass';
import axios from 'axios';
import { connect } from 'react-redux';


class BlogPost extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    };
  }

  componentWillMount() {
    let id = this.props.match.params.id;
    let url = 'http://localhost:8000/api/' + id;
    if (this.props.draft) {
      url = 'http://localhost:8000/api/draft/' + id;
    }
    axios.get(url).then((res) => {
      console.log(res)
      this.setState({
        loaded: true,
        post: res.data
      })
    })
  }

  render() {
    if (this.state.loaded) {
      const post = this.state.post;

      return (
        <div>
          <Flex>
            <Heading textAlign='center' attached='top'>{post.title}</Heading>
            <p> {post.author} </p>
            <div dangerouslySetInnerHTML={{__html: post.content}} />
          </Flex>
        </div>
      );
    } else {
      return (
        <div>
          Loading...
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn,
    user: state.user
  };
};

export default connect(mapStateToProps)(BlogPost)
