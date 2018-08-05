import axios from 'axios'
import {receivedData} from './loading'
/**
 * ACTION TYPES
 */

const GET_DATA = 'GET_DATA'
const DELETE_DATA = 'DELETE_DATA'
const ADD_CUSTOM = 'ADD_CUSTOM'

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
  console.log('data in words', data)
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
    // console.log('Data in thunk', image)
    try {
      const {data} = await axios.post('api/google/api', image)
      // console.log('Response ', data.responses[0])
      const words = getWords(data.responses[0])
      console.log('received words ', words)
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
    default:
      return state
  }
}

export default googleDataReducer
