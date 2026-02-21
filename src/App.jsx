import './Styles/App.css'
import React, { useState } from 'react'

export const App = () => {
  const [recipe, setRecipe] = useState('');
  const [recipesArr, setRecipesArr] = useState([]);

  const getRecipe = async() => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`);
    const data = await response.json();
    console.log(data);
    setRecipesArr(data.meals);
  }

  const changeRecipe = (e) => {
    setRecipe(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    getRecipe();
  }

  return (
    <>
      <header>
        <h1>Recipe-Finder</h1>
        <form action="get-recipe" onSubmit={onSubmit}>
          <label htmlFor="recipe">Search: </label>
          <input type="text" value={recipe} onChange={changeRecipe}/>
        </form>
      </header>
      <div className='content-wrapper'>
        {recipesArr.map((recipe)=>(
          <div key={recipe.idMeal} recipe={recipe}>
            <div className='recipe-container'>
              <img src={recipe.strMealThumb} alt="recipe image"/>
              <h2>{recipe.strMeal}</h2>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
