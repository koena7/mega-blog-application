import { useEffect, useState } from 'react'
import config from './config/config'
import { useDispatch } from 'react-redux'
import { login, logout } from './state-management/authSlice'
import authService from './appwrite-services/AuthenticationService'
import LoginPage from './pages/LoginPage'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((user) => {
        if(user){
          //now we will explicitly call log in to keep the state updated at all times.
          dispatch(login({userData: user}));
          setLoggedIn(true)
        }else{
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false))
  },[])

  return !loading ? (
    <div>
      <Header/>
      <Outlet />
      <Footer/>
    </div>
  ) : (
    <h1>Loading...</h1>
  )
}

export default App
