import { SessionContext } from './SessionProvider'
import { useContext,useEffect,useState } from 'react'
import supabase from './utils/supabase'
function Recipes() {
    //verifies login
    const session = useContext(SessionContext)
    const [recipes,setRecipes] = useState([])
    useEffect(() => {
        const getRecipes = async () => {
            if(session){
                const userId = session.user.id
                const {data, error } = await supabase.from('userData').select('*').eq('user_id',userId)
                if(error){
                    console.error('Error fetching data',error)
                } else {
                    setRecipes(data)
                }
            }
        }
        getRecipes()
    },[session])

  return (
    <>
    <div className='mt-16'>
    <div>Recipes</div>
    <div>
        <table>
            <tbody>
            <tr>
                <th>Recipe Name</th>
                <th>Ingredients</th>
                <th>Free From</th>
            </tr>
            </tbody>
        </table>
    </div>
    </div>
    </>
  )
}

export default Recipes