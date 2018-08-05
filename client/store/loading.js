/**
 * ACTION TYPES
 */

export const REQUEST_DATA = 'REQUEST_DATA'
export const RECEIVED_DATA = 'RECEIVED_DATA'
/**
 * ACTION CREATORS
 */

export const requestData = () => ({
  type: REQUEST_DATA,
  value: true
})

export const receivedData = () => ({
  type: RECEIVED_DATA,
  value: false
})

/**
 * REDUCER
 */

const loadingReducer = (state = {value: null}, action) => {
  switch (action.type) {
    case RECEIVED_DATA:
      return action.value
    case REQUEST_DATA:
      return action.value
    default:
      return state
  }
}

export default loadingReducer
