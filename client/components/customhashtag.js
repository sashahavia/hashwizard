import React from 'react'

const CustomHashtag = props => {
  return (
    <form onSubmit={props.handleCustom}>
      <div className="form-group">
        <label htmlFor="custom">Create custom hashtag</label>
        <input type="text" className="form-control" name="custom" />
      </div>
      <button type="submit" className="btn btn-info btn-left">
        Add hashtag
      </button>
    </form>
  )
}

export default CustomHashtag
