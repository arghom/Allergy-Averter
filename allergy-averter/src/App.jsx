import { useContext, useState } from 'react'
import supabase from './utils/supabase'
import { SessionContext } from './SessionProvider'
import Navbar from './Navbar'
import Home from './Home'
import LoginView from './LoginView'
import { Router, Outlet, Link, Navigate } from 'react-router-dom'

export default function App() {
  const session = useContext(SessionContext)
  console.log(session)

  return (
    <>
    <h1 className='font-sans'>hello</h1>

    <Navbar/>
    <div className='mt-16'>
    <Outlet/> 
    </div>
    </>
  )

}
