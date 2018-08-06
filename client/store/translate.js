import axios from 'axios'
import {receivedData} from './loading'
/**
 * ACTION TYPES
 */

const GET_TRANSLATION = 'GET_TRANSLATION'
const DELETE_TRANSLATION = 'DELETE_TRANSLATION'
const REMOVE_WORD = 'REMOVE_WORD'
/**
 * ACTION CREATORS
 */

const getTranslation = data => ({
  type: GET_TRANSLATION,
  data
})

export const deleteTranslation = () => ({
  type: DELETE_TRANSLATION
})

export const removeWord = data => ({
  type: REMOVE_WORD,
  data
})

/**
 * THUNK CREATORS
 */

export const translateHashtags = lang => {
  return async (dispatch, getState) => {
    // console.log('Lang', lang)
    const text = getState().data.join(',')
    // console.log('Data in thunk', text)
    try {
      const {data} = await axios.post('/api/watson/api', {
        lang: lang,
        text: text
      })
      // console.log('Result in thunk ', data)
      const result = data.split(',')
      let finalResult = [...new Set(result)]
      dispatch(getTranslation(finalResult))
    } catch (err) {
      console.log("Couldn't translate data...")
    }
    dispatch(receivedData())
  }
}

const watsonTranslateReducer = (state = [], action) => {
  switch (action.type) {
    case GET_TRANSLATION:
      return [...state, ...action.data]
    case DELETE_TRANSLATION:
      return []
    case REMOVE_WORD: {
      const index = state.findIndex(elem => elem === action.data)
      return [...state.slice(0, index), ...state.slice(index + 1)]
    }
    default:
      return state
  }
}

export default watsonTranslateReducer
