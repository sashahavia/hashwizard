import {combineReducers} from 'redux'
import user from './user'
import imageReducer from './image'
import googleDataReducer from './googledata'
import watsonTranslateReducer from './translate'
import loadingReducer from './loading'
import loadingTranslationReducer from './loadtranslation'

const rootReducer = combineReducers({
  user: user,
  image: imageReducer,
  data: googleDataReducer,
  translatedData: watsonTranslateReducer,
  loading: loadingReducer,
  translation: loadingTranslationReducer
})

export default rootReducer
