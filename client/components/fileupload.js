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
    console.log('Am i here')
    if (this.state.fileImg) {
      this.setState({fileImg: ''})
    } else {
      this.setState({file: event.target.files}, () => {
        Array.from(this.state.file).forEach(file => {
          console.log('Do something with ' + file.name)
          this.setState({fileImg: file.name})
        })
      })
    }
  }

  render() {
    const {image} = this.props
    console.log('Image ', image)
    const uploadedClass = this.state.fileImg
      ? 'custom-file-upload uploaded'
      : 'custom-file-upload'
    if (Object.keys(image).length === 0) {
      return (
        <div className="main-container">
          <div className="popup">
            <div className="wrapper">
              <form onSubmit={this.submitFile}>
                {/* {this.state.fileImg && (
                  <p className="uploaded">
                    {/* <i className="fas fa-file-image fa-7x uploaded" />
                    <br /> */}
                {/* {this.state.fileImg}
                  </p> */}
                {/* )} */}
                <div className="file-container">
                  <label className={uploadedClass}>
                    <input
                      type="file"
                      onInput={this.handleFileUpload}
                      accept=".png, .jpg, .jpeg"
                    />
                    <i className="fas fa-file-image fa-7x" />
                    <br />Upload an image
                  </label>
                </div>

                <button type="submit" className="btn btn-secondary btn-file">
                  Submit
                </button>
              </form>
            </div>
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

const mapDispatch = (dispatch, ownProps) => {
  return {
    imageUpload: file => dispatch(imageUpload(file, ownProps.history))
  }
}
// export default withRouter(connect(mapState, mapDispatch)(FileUpload))
export default connect(mapState, mapDispatch)(FileUpload)
