import React, { Component, PropTypes} from 'react';
import { Container, Input, Provider, Flex, Box, Heading, Image, Text, Divider, ButtonCircle } from 'rebass';
import RichTextEditor from 'react-rte-image';
import { connect } from 'react-redux'
import axios from 'axios'
import posed from 'react-pose'
import './App.css';

const NewPostDiv = posed.div({
  out: {height: 0, overflow: 'hidden'},
  in: {height: '100%', overflow: 'visible', transition: {duration: 1000}}
})

class NewPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      body: RichTextEditor.createEmptyValue(),
      saved: false,
    }
    this.saveDraft = this.saveDraft.bind(this)
    this.publishPost = this.publishPost.bind(this)
    this.onTitleChange = this.onTitleChange.bind(this)
    this.onBodyChange = this.onBodyChange.bind(this)
  }

  componentDidMount() {
    this.setState({posed: true})
  }

  update(isPublished) {
    this.setState({saving: true})
    axios.put('http://localhost:8000/api/draft/' + this.state.id +'/', {
      author: this.props.user,
      title: this.state.title,
      content: this.state.body.toString('html'),
      isPublished: isPublished
    }).then(res => {
      this.setState({saving: false, errorSaving: false})
      console.log(res)
    }).catch(err => {
      console.log(err)
      this.setState({errorSaving: true})
    }
    )
  }

  firstSave(isPublished) {
    this.setState({saving: true})
    axios.post('http://localhost:8000/api/', {
      title: this.state.title,
      author: this.state.body.toString('html'),
      content: this.props.user,
      isPublished: isPublished
    }).then((res) => {
      console.log(res)
      this.setState({saved: true, saving: false, errorSaving: false, id: res.data.id})
    })
    .catch(err => {
      console.log(err)
      this.setState({errorSaving: true})
    })
  }

  saveDraft() {
    if (this.state.saved) {
      this.update(false)
    }
    else {
      this.firstSave(false)
    }
  }

  publishPost() {
    if (this.state.saved) {
      this.update(true)
    }
    else {
      this.firstSave(true)
    }
  }

  onTitleChange(e) {
    this.setState({title: e.target.value})
    this.saveDraft()
  }

  onBodyChange = (body) => {
    this.setState({body: body})
    this.saveDraft()
  }

  render() {
    return(
      <NewPostDiv pose={this.state.posed? 'in' : 'out'}>
        <div>{!this.state.saved? 'Not saved' : this.state.saving? 'Saving Draft...' : this.state.errorSaving? 'Oops! Error saving' : 'Draft Saved' }</div>
        <div> New Post </div>
        <Input onChange={this.onTitleChange} placeHolder="Title" />
        <RichTextEditor
          value={this.state.body}
          onChange={this.onBodyChange}
        />
        <ButtonCircle mr={3} onClick={this.saveDraft} children="Save Draft" />
        <ButtonCircle mx={3} onClick={this.publishPost} children="Publish" />
      </NewPostDiv>
    )
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn,
    user: state.user
  };
};

export default connect(mapStateToProps)(NewPost)
