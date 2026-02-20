import './Styles/App.css'
import React, { useState } from 'react'

export const App = () => {
  const [recipe, setRecipe] = useState('');

  const changeRecipe = (e) => {
    setRecipe(e.target.value);
  }

  const getRecipe = async() => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`);
    const data = await response.json();
    console.log(data)
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

      </div>
    </>
  )
}
