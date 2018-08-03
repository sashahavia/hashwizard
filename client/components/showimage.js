import React from 'react'
import {connect} from 'react-redux'
import {getImageData} from '../store/googledata'
import DisplayHashtags from './displayhashtags'

const ShowImage = ({image, handleClick}) => {
  if (Object.keys(image).length === 0) {
    return <div className="box">{/* <p>Upload an image to start</p> */}</div>
  } else {
    return (
      // <div className="box">
      <div className="row box">
        <div className="col-sm">
          <img src={image} />
          <button
            type="button"
            onClick={() => handleClick(image)}
            className="btn btn-primary"
          >
            Get hash tags
          </button>
        </div>
        <div className="col-sm">
          <DisplayHashtags />
        </div>
      </div>
      // </div>
    )
  }
}
// }

const mapState = state => {
  return {
    image: state.image
  }
}

const mapStateDispatch = dispatch => {
  return {
    handleClick(image) {
      const data = {
        requests: [
          {
            image: {
              source: {
                imageUri: image
              }
            },
            features: [
              {
                type: 'LANDMARK_DETECTION',
                maxResults: 20
              },
              {
                type: 'FACE_DETECTION',
                maxResults: 20
              },
              {
                type: 'LABEL_DETECTION',
                maxResults: 20
              }
            ]
          }
        ]
      }
      dispatch(getImageData(data))
    }
  }
}

export default connect(mapState, mapStateDispatch)(ShowImage)
