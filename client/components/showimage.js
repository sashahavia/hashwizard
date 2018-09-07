import React from 'react'
import {connect} from 'react-redux'
import {getImageData} from '../store/googledata'
import DisplayHashtags from './displayhashtags'
import {requestData} from '../store/loading'

const ShowImage = ({image, handleClick}) => {
  if (Object.keys(image).length === 0) {
    return null
  } else {
    return (
      <div className="row box">
        <div className="col-sm">
          <div className="left-view">
            <button
              type="button"
              onClick={() => handleClick(image)}
              className="btn btn-light"
            >
              Create hashtags
            </button>
            <img src={image} />
          </div>
        </div>
        <div className="col-sm">
          <DisplayHashtags />
        </div>
      </div>
    )
  }
}

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
      dispatch(requestData())
      dispatch(getImageData(data))
    }
  }
}

export default connect(mapState, mapStateDispatch)(ShowImage)
