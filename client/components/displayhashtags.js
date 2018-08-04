import React from 'react'
import {connect} from 'react-redux'
import {deleteImage} from '../store/image'
import {deleteData} from '../store/googledata'
import {translateHashtags, deleteTranslation} from '../store/translate'
import SelectLanguage from './selectlanguage'

const DisplayHashtags = ({data, translatedData, handleClick, handleSubmit}) => {
  if (data.length > 0) {
    return (
      <div className="right-view">
        {/* <div className="box"> */}
        <div className="form-group">
          <button
            type="button"
            onClick={handleClick}
            className="btn btn-primary"
          >
            Upload new image
          </button>

          <SelectLanguage handleSubmit={handleSubmit} />
        </div>
        <h4>
          {data.map(hashtag => (
            <span key={hashtag} className="badge badge-pill badge-info">
              #{hashtag}
              <span />
            </span>
          ))}
          {translatedData.length > 0 &&
            translatedData.map(hashtag => (
              <span key={hashtag} className="badge badge-pill badge-info">
                #{hashtag}
                <span />
              </span>
            ))}
        </h4>
      </div>
    )
  } else {
    return (
      <div className="box">
        {/* <i className="fas fa-spinner fa-pulse"> */}
        {/* <p>Data is loading...</p> */}
        {/* </i> */}
      </div>
    )
  }
}

const mapState = state => {
  return {
    data: state.data,
    translatedData: state.translatedData
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(deleteImage())
      dispatch(deleteData())
      dispatch(deleteTranslation())
    },
    handleSubmit(evt) {
      evt.preventDefault()
      const lang = evt.target.language.value
      console.log('Language', lang)
      // console.log('Data ', props.data)
      dispatch(translateHashtags(lang))
    }
  }
}

export default connect(mapState, mapDispatch)(DisplayHashtags)
