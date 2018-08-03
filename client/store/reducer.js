import {combineReducers} from 'redux'
import user from './user'
import imageReducer from './image'
import googleDataReducer from './googledata'
import watsonTranslateReducer from './translate'

const rootReducer = combineReducers({
  user: user,
  image: imageReducer,
  data: googleDataReducer,
  translatedData: watsonTranslateReducer
})

export default rootReducer
