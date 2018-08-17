import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Container, Border, Flex, Box, Row, Column, Divider,
  Heading, Text, Truncate } from 'rebass';
import posed from 'react-pose';
import { PoseGroup } from 'react-pose'
import axios from 'axios';
import { connect } from 'react-redux'
import './App.css'


var decode = require('decode-html');
var moment = require('moment');

const ListDiv = posed.div({
  out : {opacity: 0},
  in : {opacity: 1, transition: {duration: 500, delay: 1500} },
})

const PostDiv = posed.div({
  enter: {height: 150, transition: { duration: 250 }, delay: ({i}) => i * 250},
  exit: {height: 0},
})

const NavLinks = (props) => (
  <Row>
    <Column className='prev-link'>
      {props.prev && <Link to={`${props.domain}${props.prev}`}>Prev</Link>}
    </Column>
    <Column className='next-link'>
      {props.next && <Link to={`${props.domain}${props.next}`}>Next</Link>}
    </Column>
  </Row>
)

class PostList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  _fetchPosts(page) {
    let url = 'http://localhost:8000/api/?page=' + page
    if (this.props.draft) {
      url = 'http://localhost:8000/api/drafts/?author=' + this.props.user + '&page=' + page
    }
    if (this.props.author) {
      url = 'http://localhost:8000/api/?author=' + this.props.match.params.name + '&page=' + page
    }
    this.asyncRequest = axios.get(url).then(res => {
      console.log(res)
      this._asyncRequest = null
      this.setState({
        loaded: true,
        resp: res.data
      })
      if (res.data.results.length == 0) {
        this.setState({noPosts: true})
      }
    });
  }


  componentDidMount() {
    let page = this.props.match.params.page || 1;
    this._fetchPosts(page)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.match !== prevProps.match) {
      let page = this.props.match.params.page || 1;
      this._fetchPosts(page);
    }
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  render() {
    if (this.state.loaded) {
      var next_page = this.state.resp.next ? this.state.resp.next.split('=').slice(-1)[0] : null;
      var previous_page = !this.state.resp.previous ? null : (this.state.resp.previous.split('=').length < 3) ? '1' : this.state.resp.previous.split('=').slice(-1)[0];
      var domain = this.props.draft? '/my-drafts/' : '/p/'
      return (
        <ListDiv>
          <PoseGroup animateOnMount={true}>
            {this.state.resp.results.map((post, i) => {
              let type = ''
              let truncate = decode(post.content.replace(/<[^>]+>/g, ''))
              post.isPublished? type = 'post' : type='draft'
              return (
                <PostDiv i={i} key={post.id} className='list-post'>
                  <Border borderColor='#dadbfa' p={3} my={1}>
                    <Flex>
                      <Box width={[4/5]} px={2}>
                        <Link to={`/${type}/${post.id}`}>
                          <Heading as='h2'>{post.title}</Heading>
                        </Link>
                        <Divider borderColor='#dadbfa' />
                        <Truncate> {truncate} </Truncate>
                      </Box>
                      <Box width={[1/5]}>
                        {!this.props.draft && <Text> <Link to={`/author/${post.author}`} children={post.author}/> </Text> }
                        <Text children={moment(post.updated_at).format('MMM Do [\']YY')} />
                      </Box>
                    </Flex>
                  </Border>
                </PostDiv>
              )
            })
            }
            {this.state.noPosts && <div> No Posts yet! </div>}
            </PoseGroup>
            <NavLinks domain={domain} next={next_page} prev={previous_page} />
        </ListDiv>
      );
    } else {
      return (
        <div>
          Loading...
        </div>
      )
    }
  }
}
function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn,
    user: state.user,
  };
};

export default connect(mapStateToProps)(PostList)
