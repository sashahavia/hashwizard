import {createStore, applyMiddleware} from 'redux'
// import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from './reducer'

// For Development
// const middleware = composeWithDevTools(
//   applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
// )

// For production
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware))
const store = createStore(rootReducer, middleware)

export default store
export * from './user'
