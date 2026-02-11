import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './state-management/store.js'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { Router } from './routes/routes.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store = {store}>
      <RouterProvider router={Router} /> 
    </Provider>
  </StrictMode>
)
