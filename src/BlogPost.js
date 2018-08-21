import React, { Component } from 'react';
import { Container, Provider, Flex, Box, Heading, Border, Divider, Text, ButtonCircle } from 'rebass';
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
    let url = 'http://localhost:8000/api/' + id + '/';
    axios.get(url).then((res) => {
      if (!res.data.isPublished && this.props.user !== res.data.author) {
        this.setState({  loaded: true, unauthorised: true, post: res.data })
      }
      else {
        this.setState({
          unauthorised: false,
          loaded: true,
          post: res.data
        })
      }
    })
  }

  render() {
    if (this.state.loaded) {
      const post = this.state.post;

      return (
        <div>
          {this.state.unauthorised?
          <div> Access to draft by another user is unauthorised </div>
          :
          <Border borderColor='#dadbfa' p={3} my={1}>
            <Flex>
              <Box width={[4/5]} px={2}>
                <Heading as='h2'>{post.title}</Heading>
                <Divider borderColor='#dadbfa' />
                <Text dangerouslySetInnerHTML={{__html:post.content}} />
              </Box>
              <Box width={[1/5]}>
                {!this.props.draft && <Text> <Link to={`/author/${post.author}`} children={post.author}/> </Text> }
                <Text children={moment(post.updated_at).format('MMM Do [\']YY')} />
              </Box>
            </Flex>
          </Border>
          }
          {this.props.draft ||  this.props.user === post.author? <Link to={`/edit-post/${post.id}`} children={post.author} ><ButtonCircle children='Edit Post' /></Link> : null}
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
