import React from 'react'
import { useLocation } from 'react-router-dom'

function DisplayRecipe() {
    const location = useLocation()
    const { recipe } = location.state


  return (
    <>
    <div className='flex justify-center flex-col items-center'>
        <div>
        <h1 className=' text-7xl font-medium'>{recipe.Name}</h1>
        </div>
        <div>
        <h2 className='pt-5 text-3xl'>Allergens: {recipe.Allergens.join(', ')}</h2>
        </div>
        <table>
            <tbody>
                <tr>
                    <th>Ingredient</th>
                    <th>Quantity</th>
                </tr>
            </tbody>
            <tbody>
                {recipe.Ingredients.map((ing,index) => {
                    return <tr key={index}><td>{ing.Name}</td><td>{ing.Measurement}</td></tr>
                })}
            </tbody>
        </table>
        <h2>Steps</h2>
        <ol>
            {recipe.Steps.map((step,index) => {
                return <li key={index}>{step}</li>
            })}
        </ol>
    </div>
    </>
  )
}

export default DisplayRecipe