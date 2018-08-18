import React, { Component } from 'react';
import { Container, Provider, Flex, Box, Heading, Border, Divider, Text } from 'rebass';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
var moment = require('moment');


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
        <Border borderColor='#dadbfa' p={3} my={1}>
          <Flex>
            <Box width={[4/5]} px={2}>
              <Heading as='h2'>{post.title}</Heading>
              <Divider borderColor='#dadbfa' />
              <Text> post.content </Text>
            </Box>
            <Box width={[1/5]}>
              {!this.props.draft && <Text> <Link to={`/author/${post.author}`} children={post.author}/> </Text> }
              <Text children={moment(post.updated_at).format('MMM Do [\']YY')} />
            </Box>
          </Flex>
        </Border>
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
