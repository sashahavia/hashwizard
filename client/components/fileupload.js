import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
// import axios from 'axios'
import {imageUpload} from '../store/image'
import ShowImage from './showimage'

class FileUpload extends Component {
  constructor() {
    super()
    this.state = {
      file: null
    }
  }

  submitFile = event => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('file', this.state.file[0])
    this.props.imageUpload(formData)
  }

  handleFileUpload = event => {
    this.setState({file: event.target.files})
  }

  render() {
    const {image} = this.props
    console.log('Image ', image)
    if (Object.keys(image).length === 0) {
      return (
        <div className="popup">
          <div className="wrapper">
            <form onSubmit={this.submitFile}>
              <input
                label="upload file"
                type="file"
                onChange={this.handleFileUpload}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      )
    } else {
      return (
        <div className="popup">
          <div className="wrapper">
            <ShowImage />
          </div>
        </div>
      )
    }
  }
}

const mapState = state => {
  return {
    image: state.image
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    imageUpload: file => dispatch(imageUpload(file, ownProps.history))
  }
}
// export default withRouter(connect(mapState, mapDispatch)(FileUpload))
export default connect(mapState, mapDispatch)(FileUpload)
