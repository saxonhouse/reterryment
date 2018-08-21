import React, { Component } from 'react';
import S3FileUpload from 'react-s3';
import s3config  from './secrets';
import { Button, Text} from 'rebass';
import './App.css'

//Optional Import
import { uploadFile } from 'react-s3';

class LocalImageBox extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    }

  fileChange = (event) => {
    this.setState({
      file: event.target.files[0]
    })
    uploadFile(event.target.files[0], s3config)
    .then(data => {
      let image = `<img style src='${data.location}' />`
      this.props.addImage(image)
    })
    .catch(err => console.error(err))
  }

  videoChange = (event) => {
    uploadFile(event.target.files[0], s3config)
    .then(data => {
      this.setState({videoPreview: data.location})
      console.log(data.location)
      this.props.addVideo(data.location)
    })
    .catch(err => console.error(err))
  }

  render() {
    return (
      <div>
        <form>
          <div className="upload-btn-wrapper">
            <Button className="btn"> Image Upload </Button>
            <input name="myfile" type="file" onChange={this.fileChange} />
          </div>
        </form>
        <form>
          <div className="upload-btn-wrapper">
            <Button className="btn"> Video Upload </Button>
            <input name="myfile" type="file" onChange={this.videoChange} />
          </div>
        </form>
        <Text> Note: Only one video per post.</Text>
      </div>
    )
  }
  }

  export default LocalImageBox;
