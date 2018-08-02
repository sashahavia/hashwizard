import {combineReducers} from 'redux'
import user from './user'
import imageReducer from './image'
import googleDataReducer from './googledata'

const rootReducer = combineReducers({
  user: user,
  image: imageReducer,
  data: googleDataReducer
})

export default rootReducer
