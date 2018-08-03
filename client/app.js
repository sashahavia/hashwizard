import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import FileUpload from './components/fileupload'

const App = () => {
  return (
    <div>
      <Navbar />
      {/* <Routes /> */}
      <FileUpload />
    </div>
  )
}

export default App
