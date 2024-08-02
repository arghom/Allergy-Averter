import { useContext } from 'react'
import supabase from './utils/supabase'
import './css/App.css'
import { SessionContext } from './SessionProvider'
import Navbar from './Navbar'
import Home from './Home'
import LoginView from './LoginView'

export default function App() {
  const session = useContext(SessionContext)

  

  return (
    <>
    <Navbar/>
    {session ? <Home/> : <LoginView/>}
    </>
  )

}
