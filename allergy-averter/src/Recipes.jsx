import { SessionContext } from './SessionProvider'
import { useContext,useEffect,useState } from 'react'
import supabase from './utils/supabase'
import { useNavigate } from 'react-router-dom'
function Recipes() {
    //verifies login
    const session = useContext(SessionContext)
    const [recipes,setRecipes] = useState([])
    const navigate = useNavigate()
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
    console.log(recipes)

    const navigateToDisplayRecipe = ( {selectedRecipe} ) => {
        navigate('/displayRecipe',{state: {recipe: selectedRecipe}})
    }
  return (
    <>
    <div className='flex justify-center items-center flex-col'>
    <div className=''>Recipes</div>
    <div>
        <table>
            <tbody>
            <tr>
                <th>Recipe Name</th>
                <th>Free From</th>
                <th>Link To</th>
            </tr>
            </tbody>
            {recipes ? <tbody>
                {recipes.map((recipe,index) => {
                    return <tr key={index}><td>{recipe.recipe.Recipe.Name}</td><td>{recipe && recipe.recipe.Recipe.Allergens.join(', ')}</td><td><button className='text-blue-600' onClick={() => navigateToDisplayRecipe({selectedRecipe : recipe.recipe.Recipe})}>Open Recipe</button></td></tr>
                })}
            </tbody> : <div></div>}
        </table>
    </div>
    </div>
    </>
  )
}

export default Recipes