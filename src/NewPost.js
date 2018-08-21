import React, { Component, PropTypes} from 'react';
import { Container, Input, Provider, Flex, Box, Heading, Image, Text, Divider, ButtonCircle } from 'rebass';
import RichTextEditor from 'react-rte-image';
import { connect } from 'react-redux'
import axios from 'axios'
import posed from 'react-pose'
import { ClipLoader } from 'react-spinners'
import LocalImageBox from './s3';
import { Link } from 'react-router-dom'
import './App.css';
var moment = require('moment')

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
      saving: false
    }
    this.saveDraft = this.saveDraft.bind(this)
    this.publishPost = this.publishPost.bind(this)
    this.onTitleChange = this.onTitleChange.bind(this)
    this.onBodyChange = this.onBodyChange.bind(this)
  }

  componentDidMount() {
    this.setState({posed: true})
    console.log(this.props.match)
  }

  componentWillMount() {
    if (this.props.match.params.id) {
      axios.get('http://localhost:8000/api/' + this.props.match.params.id +'/').then(res => {
        console.log(res)
        this.setState({
          title: res.data.title,
          body: RichTextEditor.createValueFromString(res.data.content, 'html')
        })
      })
    }
  }

  update(isPublished) {
    this.setState({saving: true})
    axios.put('http://localhost:8000/api/' + this.state.id +'/', {
      author: this.props.user,
      title: this.state.title,
      content: this.state.body.toString('html'),
      video: this.state.video,
      isPublished: isPublished
    }).then(res => {
      this.setState({
        saving: false,
        errorSaving: false,
        savedAt: res.data.updated_at})
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
      author: this.props.user,
      content: this.state.body.toString('html'),
      video: this.state.video,
      isPublished: isPublished
    }).then((res) => {
      console.log(res)
      this.setState({
        saved: true,
        saving: false,
        errorSaving: false,
        id: res.data.id,
        savedAt: res.data.updated_at})
    })
    .catch(err => {
      console.log(err)
      this.setState({errorSaving: true})
    })
  }

  saveDraft() {
    if (this.state.saved) {
      if (moment(this.state.savedAt).isBefore(moment().subtract(10, 'seconds'))) {
        this.update(false)
      }
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

  addImage = (image) => {
    let body = this.state.body.toString('html') + image
    console.log(body)
    let html = RichTextEditor.createValueFromString(body, 'html')
    this.setState({body:html})
  }

  addVideo = (video) => {
    this.setState({video: video})
    console.log(video)
    this.saveDraft()
  }

  render() {
    return(
      <NewPostDiv pose={this.state.posed? 'in' : 'out'}>
        <Heading textAlign="Center" color='#003366' className="title" mb={2}>{this.props.match.params.id?'Edit Post':'New Post'}</Heading>
        <Input fontSize={5} my={1} onChange={this.onTitleChange} placeHolder="Title" value={this.state.title}/>
        <div className='draft-status'>
          <ClipLoader className='draft-loader' loading={this.state.saving} size={15} />
          {!this.state.saved? null : this.state.saving? ' Saving Draft...' : this.state.errorSaving? 'Oops! Error saving' : ' Draft Saved' }
        </div>
        <LocalImageBox addImage={this.addImage} addVideo={this.addVideo} />
        <RichTextEditor
          value={this.state.body}
          onChange={this.onBodyChange}
          className="rte-box"
        />
        <Container className="new-post-buttons" mb={3}>
          <ButtonCircle mr={3} onClick={this.saveDraft} children="Save Draft" />
          <ButtonCircle onClick={this.publishPost} children="Publish" />
        </Container>
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
