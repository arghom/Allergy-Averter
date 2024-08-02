import supabase from "./utils/supabase";
// used to show loading
import { useState } from "react";

const LoginPopup = ({onClose}) => {
    const [loading,setLoading] = useState(false)

    // setting up the login with a given provider
    const login = async (provider) => {
        setLoading(true)
        const { error } = await supabase.auth.signInWithOAuth({provider})
        if(error){
            console.error('Login error',error.message)
            setLoading(false)
        } else {
            setLoading(false)
            onClose()
        }
    }
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <button onClick={() => login('github')} className="w-full bg-gray-800 text-white py-2 px-4 rounded mb-2" disabled={loading}>
                    {loading ? 'Loading...' : 'Login with Github'}
                </button>
                <button onClick={() => login('google')} className="w-full border-black border-2 text-black py-2 px-4 rounded mb-2" disabled={loading}>
                    {loading ? 'Loading...' : 'Login with Google'}
                </button>
            <button onClick={onClose} className="w-full bg-red-500 text-white py-2 px-4 rounded">
          Cancel
        </button>
            </div>
        </div>
    )
}
export default LoginPopup