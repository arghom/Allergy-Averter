import { useContext, useState } from 'react'
import supabase from './utils/supabase'
import { SessionContext } from './SessionProvider'
import Navbar from './Navbar'
import Home from './Home'
import LoginView from './LoginView'

export default function App() {
  const session = useContext(SessionContext)


  

  return (
    <>
      <h1 className='font-sans'>hello</h1>

    <Navbar/>
    <div>
    {session ? <Home/> : <LoginView/>}
    </div>
    </>
  )

}
