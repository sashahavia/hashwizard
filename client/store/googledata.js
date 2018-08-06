import axios from 'axios'
import {receivedData} from './loading'
/**
 * ACTION TYPES
 */

const GET_DATA = 'GET_DATA'
const DELETE_DATA = 'DELETE_DATA'
const ADD_CUSTOM = 'ADD_CUSTOM'
const REMOVE_HASH = 'REMOVE_HASH'

/**
 * ACTION CREATORS
 */
const getData = data => ({
  type: GET_DATA,
  data
})

export const deleteData = () => ({
  type: DELETE_DATA
})

export const addCustom = data => ({
  type: ADD_CUSTOM,
  data
})

export const removeHash = data => ({
  type: REMOVE_HASH,
  data
})

const getValues = (data, hashtags) => {
  for (let j = 0; j < data.length; j++) {
    if (data[j].joyLikelihood === 'VERY_LIKELY') {
      hashtags.push('happy ')
    }
    if (data[j].surpriseLikelihood === 'VERY_LIKELY') {
      hashtags.push('surprise ')
    }
  }
  return hashtags
}

/**
 * HELPER FUNCTIONS
 */
const getValuesTwo = (data, hashtags) => {
  for (let i = 0; i < data.length; i++) {
    hashtags.push(data[i].description + ' ')
  }
}

const getWords = data => {
  // console.log('data in words', data)
  let hashtags = []
  if (data.labelAnnotations) {
    getValuesTwo(data.labelAnnotations, hashtags)
  }

  if (data.landmarkAnnotations) {
    getValuesTwo(data.landmarkAnnotations, hashtags)
  }
  if (data.faceAnnotations) {
    getValues(data.faceAnnotations, hashtags)
  }
  let unique = [...new Set(hashtags)]
  return unique
}

/**
 * THUNK CREATORS
 */

export const getImageData = image => {
  return async dispatch => {
    try {
      const {data} = await axios.post('api/google/api', image)
      const words = getWords(data.responses[0])
      // console.log('received words ', words)
      dispatch(getData(words))
    } catch (err) {
      console.log('Something went wrong')
    }
    dispatch(receivedData())
  }
}

const googleDataReducer = (state = [], action) => {
  switch (action.type) {
    case GET_DATA:
      return action.data
    case DELETE_DATA:
      return []
    case ADD_CUSTOM:
      return [...state, action.data]
    case REMOVE_HASH: {
      const index = state.findIndex(elem => elem === action.data)
      return [...state.slice(0, index), ...state.slice(index + 1)]
    }
    default:
      return state
  }
}

export default googleDataReducer
