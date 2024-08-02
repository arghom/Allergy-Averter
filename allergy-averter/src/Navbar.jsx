import { useContext } from "react";
import { SessionContext } from "./SessionProvider";
import supabase from "./utils/supabase";
import './css/Navbar.css'
const Navbar = () => {
    // establish context to update the session to logout if 
    // it is null
    const session = useContext(SessionContext)

    // we create the login 
    const login = async () => {
        const { error }= await supabase.auth.signInWithOAuth({
          provider:'github'
        })
        if (error) console.error("error on sign in", error.message)
    
      };
    const logout = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) console.error('sign-out error', error.message)
    }

    return(
        <nav>
            <ul>
                {
                    session ? 
                    (
                        //if session is valid show the login otherwise show logout
                        <>  
                        <h1>authenticated as {session.user.email}</h1>
                        <button onClick={logout}></button>
                        </>
                    ) : 
                    (
                        <>
                        <h1>Login please!</h1>
                        <button onClick={login}></button>
                        </>
                    )
                }
            </ul>
        </nav>
    )

}
export default Navbar