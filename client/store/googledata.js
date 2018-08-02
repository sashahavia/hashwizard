import axios from 'axios'

const GET_DATA = 'GET_DATA'
const DELETE_DATA = 'DELETE_DATA'

const getData = data => ({
  type: GET_DATA,
  data
})

export const deleteData = () => ({
  type: DELETE_DATA
})

const getValues = (data, hashtags) => {
  for (let j = 0; j < data.length; j++) {
    if (data[j].joyLikelihood === 'VERY_LIKELY') {
      hashtags.push('#happy')
    }
    if (data[j].surpriseLikelihood === 'VERY_LIKELY') {
      hashtags.push('#surprise')
    }
  }
  return hashtags
}

const getValuesTwo = (data, hashtags) => {
  for (let i = 0; i < data.length; i++) {
    hashtags.push('#' + data[i].description)
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

export const getImageData = image => {
  return async dispatch => {
    console.log('Data in thunk', image)
    console.log('Data in thunk json', JSON.stringify(image))
    try {
      const {data} = await axios.post(
        'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCjU8HDo9M7z5DVKYmXMgZTtgxk5QepGzc',
        image
      )
      console.log('Response ', data.responses[0])
      const words = getWords(data.responses[0])
      console.log('received words ', words)
      dispatch(getData(words))
    } catch (err) {
      console.log('Something went wrong')
    }
  }
}

const googleDataReducer = (state = [], action) => {
  switch (action.type) {
    case GET_DATA:
      return action.data
    case DELETE_DATA:
      return []
    default:
      return state
  }
}

export default googleDataReducer
