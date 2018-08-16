import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Container, Header, Segment } from 'semantic-ui-react';
import axios from 'axios';
import { connect } from 'react-redux'

class PostList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  fetchPosts(page) {
    let url = 'http://localhost:8000/api/?page='
    if (this.props.draft) {
      url = 'http://localhost:8000/api/drafts/?author=' + this.props.user + '&page='
    }
    axios.get(url + page).then((res) => {
      this.setState({
        loaded: true,
        resp: res.data
      })
    })
  }


  componentWillMount() {
    let page = this.props.match.params.page || 1;
    this.fetchPosts(page)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({loaded: false});
    let page = nextProps.match.params.page || 1;
    this.fetchPosts(page)
  }

  render() {
    if (this.state.loaded) {
      const next_page = this.state.resp.next;
      const previous_page = this.state.resp.previous;
      return (
        <div>
          {this.state.resp.results.map((post) => {
            let type = ''
            post.isPublished? type = 'post' : type='draft'
            return (
              <div key={post.id}>
                <Link to={`/${type}/${post.id}`}>
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
function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn,
    user: state.user,
  };
};

export default connect(mapStateToProps)(PostList)
