import { useState, useEffect } from "react"
import GenAi from "./utils/GenAi"
function Home() {
    const [results,setResults] = useState('')
    const [link,setLink] = useState('')
    const [allergens,setAllergens] = useState('')

    async function handleSubmit(){
        console.log(`link: ${link}`)
        console.log(allergens)
        if(allergens.length == 0){
            return
        }
        try{
        const aiResults = await GenAi({link, allergens})
        const text = await JSON.parse(aiResults)
        console.log(text)
        setResults(text)
        console.log(results)
        }catch(error){
            console.error('Error in generating content',error)
            setResults([])
        }
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

        
    </>
  )
}

export default Home