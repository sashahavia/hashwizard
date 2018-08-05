/**
 * ACTION TYPES
 */

export const REQUEST_TRANSLATION = 'REQUEST_TRANSLATION'
export const RECEIVED_TRANSLATION = 'RECEIVED_TRANSLATION'
/**
 * ACTION CREATORS
 */

export const requestTranslation = () => ({
  type: REQUEST_TRANSLATION,
  value: true
})

export const receivedTranslation = () => ({
  type: RECEIVED_TRANSLATION,
  value: false
})

/**
 * REDUCER
 */

const loadingTranslationReducer = (state = {value: null}, action) => {
  switch (action.type) {
    case RECEIVED_TRANSLATION:
      return action.value
    case REQUEST_TRANSLATION:
      return action.value
    default:
      return state
  }
}

export default loadingTranslationReducer
