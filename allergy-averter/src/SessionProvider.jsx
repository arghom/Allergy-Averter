import { createContext, useEffect, useState } from "react";
import supabase  from "./utils/supabase";

const SessionContext = createContext(null)

const SessionProvider = ({ children }) => {
    const [session, setSession] = useState(null)

    useEffect(() => {
        const {data: {subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if(event === 'SIGNED_OUT') { 
                setSession(null)
            } else if(session) { 
                setSession(session)
                console.log(session)
            }
        });


        const getSession = async () => {
            const {data: { session }, error } = await supabase.auth.getSession()
            if(error){
                console.error('Error getting session:', error.message)
                return
            }
            setSession(session)
        }
        getSession()

        return () => {
            subscription.unsubscribe()
        }
    },[])

    return (
        <SessionContext.Provider value={session}>
            {children}
        </SessionContext.Provider>
    )

}
export { SessionContext, SessionProvider }
