import './Styles/App.css'
import React, { useState } from 'react'

//Add an 'favorite-list' to project
const initialState = {

}

export const App = () => {
  const [recipe, setRecipe] = useState('');
  const [recipesArr, setRecipesArr] = useState([]);

  const getRecipe = async() => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`);
      const data = await response.json();
      console.log(data);
      setRecipesArr(data.meals);  
    } catch (error) {
      window.location.reload();
      alert("Recipe not found");
    }
  }

  const changeRecipe = (e) => {
    setRecipe(e.target.value);
  }

  const addFavButton = (recipe) => {
    
  }

  const onSubmit = (e) => {
    e.preventDefault();

    getRecipe();
  }

  return (
    <>
      <header>
        <h1>Start Cooking!</h1>
        <form action="get-recipe" onSubmit={onSubmit}>
          <label htmlFor="recipe">Search: </label>
          <input type="text" value={recipe} onChange={changeRecipe}/>
        </form>
      </header>
      <div className='content-wrapper'>
        {recipesArr.map((recipe)=>(
          <div key={recipe.idMeal} recipe={recipe}>
            <div className='recipe-container'>
              <button className='add-to-fav-button' onClick={() => addFavButton(recipe)}>
                <i class="fa-regular fa-bookmark"></i>
              </button>
              <img src ={recipe.strMealThumb} alt="recipe image"/>
              <div>
                <h2>{recipe.strMeal}</h2>
                <div className='instruction-container'>
                  <h3>Instructions:</h3>
                  <p>{recipe.strInstructions}</p>
                </div>
                <hr />
                <div className='source-container'>
                  <p>Source: <a href={recipe.strSource} target='_blank'>click here</a></p>        
                </div>
              </div>      
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
