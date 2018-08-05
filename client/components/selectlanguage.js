import React from 'react'

const SelectLanguage = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="form-group">
        <label htmlFor="language">Language to translate</label>
        <select className="form-control" name="language" required>
          <option value="">Select language</option>
          <option value="es">Spanish</option>
          <option value="ru">Russian</option>
          <option value="de">German</option>
          <option value="it">Italian</option>
          <option value="fr">French</option>
        </select>
      </div>
      <button type="submit" className="btn btn-info btn-left">
        Translate
      </button>
    </form>
  )
}

export default SelectLanguage
