import { useContext, useState } from "react";
import { SessionContext } from "./SessionProvider";
import { Link } from "react-router-dom";
import supabase from "./utils/supabase";
import LoginPopup from './LoginPopup'
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    // establish context to update the session to logout if 
    // it is null
    const session = useContext(SessionContext)
    const [showLoginPopup,setShowLoginPopup] = useState(null)
    const navigate = useNavigate()

    const navigateToRecipes = () => {
        navigate('/recipes')
    }
    const navigateHome = () => {
        navigate('/')
    }

    const toggleLoginPopup = () => {
      setShowLoginPopup(!showLoginPopup)
    }
    // sign out of login 
    const logout = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) console.error('sign-out error', error.message)
    }

    return (
        <>
        <nav className="fixed top-0 left-0 w-full bg-green-800 text-white shadow-md z-10">
          <div className="container mx-auto p-4">
            <ul className="flex items-center justify-between">
                <li>
                    <button className='text-xl font-sans' onClick={navigateHome}>Allergy Averter</button>
                </li>
                <li className=" flex items-center ">
              {session ? (
                // If session is valid, show the Recipes and logout button
                <>
                    <button className="pr-5 text-xl" onClick={navigateToRecipes}>Recipes</button>
                  <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Logout
                  </button>
                </>
              ) : (
                // If no session, show the login message and login button
                <>
                  <h1 className="mr-4 font-sans">Login please!</h1>
                  <button
                    onClick={toggleLoginPopup}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Login
                  </button>
                </>
              )}
              </li>
            </ul>
          </div>
        </nav>
        {showLoginPopup && <LoginPopup onClose={toggleLoginPopup}/>}
        </>
      )

}
export default Navbar