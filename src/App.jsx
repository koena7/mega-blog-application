import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import config from './config/config'

function App() {
  console.log(config.appwriteUrl)

  return (
    <>
      <h1> Blog app with Appwrite</h1>
    </>
  )
}

export default App
