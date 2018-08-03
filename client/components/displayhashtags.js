import React from 'react'
import {connect} from 'react-redux'
import {deleteImage} from '../store/image'
import {deleteData} from '../store/googledata'

const DisplayHashtags = ({data, handleClick}) => {
  if (Object.keys(data).length > 0) {
    return (
      <div className="right-view">
        {/* <div className="box"> */}
        <button type="button" onClick={handleClick} className="btn btn-primary">
          Upload new image
        </button>
        <h4>
          {data.map(hashtag => (
            <span key={hashtag} className="badge badge-pill badge-info">
              {hashtag}
            </span>
          ))}
        </h4>
      </div>
    )
  } else {
    return <div className="box">{/* <p>Data is loading...</p> */}</div>
  }
}

const mapState = state => {
  return {
    data: state.data
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(deleteImage())
      dispatch(deleteData())
    }
  }
}

export default connect(mapState, mapDispatch)(DisplayHashtags)
