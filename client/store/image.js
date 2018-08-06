import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_IMAGE = 'GET_IMAGE'
const DELETE_IMAGE = 'DELETE_IMAGE'

/**
 * ACTION CREATORS
 */
const getImage = image => ({
  type: GET_IMAGE,
  image
})

export const deleteImage = () => ({
  type: DELETE_IMAGE
})

/**
 * THUNK CREATORS
 */

export const imageUpload = formData => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/uploads/image-upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      // console.log('Location ', data.Location)
      dispatch(getImage(data.Location))
    } catch (err) {
      console.log('No data ...')
    }
  }
}

/**
 * REDUCER
 */
const imageReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_IMAGE:
      return action.image
    case DELETE_IMAGE:
      return {}
    default:
      return state
  }
}

export default imageReducer
