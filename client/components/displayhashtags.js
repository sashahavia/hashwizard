import React from 'react'
import {connect} from 'react-redux'
import {deleteImage} from '../store/image'
import {deleteData, addCustom} from '../store/googledata'
import {translateHashtags, deleteTranslation} from '../store/translate'
import SelectLanguage from './selectlanguage'
import {requestData} from '../store/loading'
import CustomHashtag from './customhashtag'

const DisplayHashtags = ({
  loading,
  data,
  translatedData,
  handleClick,
  handleSubmit,
  handleCustom
}) => {
  // if (data.length > 0) {
  //   data = data.forEach(elem => {
  //     elem.replace(/ /g, '')
  //   })
  // }

  if (loading === true) {
    return (
      <div className="box">
        <i className="fas fa-spinner fa-pulse fa-2x">
          {/* <p>Data is loading...</p> */}
        </i>
      </div>
    )
  }
  if (data.length > 0) {
    return (
      <div className="right-view">
        <div className="form-group top">
          <CustomHashtag handleCustom={handleCustom} />
          <SelectLanguage handleSubmit={handleSubmit} />
        </div>
        <h4>
          {data.map(hashtag => (
            <span key={hashtag} className="badge badge-pill badge-info">
              #{hashtag.replace(/ /g, '')}
              <span />
            </span>
          ))}
          {translatedData.map(hashtag => (
            <span key={hashtag} className="badge badge-pill badge-info">
              #{hashtag.replace(/ /g, '')}
              <span />
            </span>
          ))}
        </h4>
        <div>
          <button
            type="button"
            onClick={handleClick}
            className="btn btn-dark right"
          >
            Upload new image
          </button>
        </div>
      </div>
    )
  }
  return null
}

const mapState = state => {
  return {
    data: state.data,
    loading: state.loading,
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
      // console.log('Language', lang)
      dispatch(requestData())
      dispatch(translateHashtags(lang))
    },
    handleCustom(evt) {
      evt.preventDefault()
      const custom = evt.target.custom.value
      console.log('Custom', custom)
      dispatch(addCustom(custom))
      evt.target.reset()
    }
  }
}

export default connect(mapState, mapDispatch)(DisplayHashtags)
