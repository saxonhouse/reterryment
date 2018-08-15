import React, { Component } from 'react';
import { Link } from 'react-router'
import Butter from 'buttercms'
import { Container, Header, Segment } from 'semantic-ui-react';
import axios from 'axios';

const butter = Butter('6d7db31c47e2c50d2e7b390c83d64b076b06aa06');

class BlogHome extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    };
  }

  fetchPosts(page) {
    let url = 'http://localhost:8000/api/?page=' + page;
    axios.get(url).then((res) => {
      console.log(res)
      this.setState({
        loaded: true,
        resp: res.data
      })
    })
  }


  componentWillMount() {
    let page = this.props.params.page || 1;

    this.fetchPosts(page)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({loaded: false});

    let page = nextProps.params.page || 1;

    this.fetchPosts(page)
  }

  render() {
    if (this.state.loaded) {
      const next_page = this.state.resp.next;
      const previous_page = this.state.resp.previous;

      return (
        <div>
          {this.state.resp.results.map((post) => {
            return (
              <div key={post.id}>
                <Link to={`/post/${post.id}`}>
                  <Header as='h2'>{post.title}</Header>
                </Link>
                <p>{post.summary}</p>
                <p>{post.published}</p>
              </div>
            )
          })}

          <br />

          <div>
            {previous_page && <Link to={`/p/${previous_page}`}>Prev</Link>}

            {next_page && <Link to={`/p/${next_page}`}>Next</Link>}
          </div>
        </div>
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

export default BlogHome;
