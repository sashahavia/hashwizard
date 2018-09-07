import React, {Component} from 'react'
import {connect} from 'react-redux'
import {imageUpload} from '../store/image'
import ShowImage from './showimage'

class FileUpload extends Component {
  constructor() {
    super()
    this.state = {
      file: null,
      fileImg: ''
    }
    this.handleFileUpload = this.handleFileUpload.bind(this)
  }

  submitFile = event => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('file', this.state.file[0])
    this.props.imageUpload(formData)
    this.setState({fileImg: ''})
  }

  handleFileUpload = event => {
    if (this.state.fileImg) {
      this.setState({fileImg: ''})
    } else {
      this.setState({file: event.target.files}, () => {
        Array.from(this.state.file).forEach(file => {
          this.setState({fileImg: file.name})
        })
      })
    }
  }

  render() {
    const {image} = this.props
    const uploadedClass = this.state.fileImg
      ? 'custom-file-upload uploaded'
      : 'custom-file-upload'
    if (Object.keys(image).length === 0) {
      return (
        <div className="main-container">
          <div className="file-container">
            <form onSubmit={this.submitFile}>
              <div className="fileUpload">
                <span className={uploadedClass}>
                  <input
                    type="file"
                    className="upload"
                    onChange={this.handleFileUpload}
                    accept=".png, .jpg, .jpeg"
                  />
                  <i className="fas fa-file-image fa-7x" />
                  <br />Upload an image
                </span>
              </div>
              <button type="submit" className="btn btn-secondary btn-file">
                Submit
              </button>
            </form>
          </div>
        </div>
      )
    } else {
      return (
        <div className="main-container">
          <ShowImage />
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

const mapDispatch = dispatch => {
  return {
    imageUpload: file => dispatch(imageUpload(file))
  }
}
// export default withRouter(connect(mapState, mapDispatch)(FileUpload))
export default connect(mapState, mapDispatch)(FileUpload)
