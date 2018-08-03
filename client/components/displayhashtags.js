import React from 'react'
import {connect} from 'react-redux'
import {deleteImage} from '../store/image'
import {deleteData} from '../store/googledata'
import {translateHashtags, deleteTranslation} from '../store/translate'

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

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="language">Language</label>
              <select className="form-control" name="language">
                <option value="es">Spanish</option>
                <option value="ru">Russian</option>
                <option value="de">German</option>
                <option value="it">Italian</option>
              </select>
            </div>
            <button type="submit" className="btn btn-info">
              Translate
            </button>
          </form>
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
    return <div className="box">{/* <p>Data is loading...</p> */}</div>
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
