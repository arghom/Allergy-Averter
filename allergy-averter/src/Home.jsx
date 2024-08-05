import { useState, useEffect, useContext } from "react"
import GenAi from "./utils/GenAi"
import supabase from "./utils/supabase"
import { SessionContext } from "./SessionProvider"
import { Navigate, useNavigate } from 'react-router-dom'


function Home() {
    const [results,setResults] = useState({})
    const [link,setLink] = useState('')
    const [allergens,setAllergens] = useState('')
    const session = useContext(SessionContext)
    const navigate = useNavigate()

    async function handleSubmit(){
        console.log(`link: ${link}`)
        console.log(allergens)
        if(allergens.length == 0){
            return
        }
        try{
        const aiResults = await GenAi({link, allergens})
        const text = JSON.parse(aiResults)
        console.log(text)
        console.log(typeof(aiResults))
        console.log(typeof(text))
        console.log(typeof(results))
        setResults(text.Recipe)
        if (session && session.user && session.user.id) {
            await addRecipe({ newRecipe: text });
        }
        console.log(results)
        }catch(error){
            console.error('Error in generating content',error)
            setResults([])
            return
        }
        navigateToDisplayRecipe()
    }
    const addRecipe = async ({ newRecipe }) => {
        console.log(typeof(newRecipe))
        const {data, error} = await supabase
        .from('userData')
        .insert(
          {
            user_id: session.user.id,
            recipe: newRecipe,
          },
        )
        if(error){
            console.error("Error inserting into table",error)
        }else{
            console.log('Inserted data', newRecipe)
        }
    }
    
    const navigateToDisplayRecipe = () => {
        navigate('/displayRecipe',{state: {recipe: results}})
    }

  return (
    <>
        <div className='pt-6 flex items-center justify-center flex-col'>
            <div className='text-5xl font-thin'>Go allergy free!</div>
            <h1 className='mt-5'>Enter link to a recipe and we will make it allergy free!</h1>
            <input type="text" onChange={(e) => setLink(e.target.value)} className='border-4 mt-5' size='70' placeholder='Enter the link here!'/>
            <input type="text" onChange={(e) => setAllergens(e.target.value)} className='border-4 border-blue-600 mt-5' size='50' placeholder='Enter allergens here!'/>
            <button onClick={handleSubmit} className='mt-5 bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500'>Enter!</button>
        </div>
        {}
        
    </>
  )
}

export default Home