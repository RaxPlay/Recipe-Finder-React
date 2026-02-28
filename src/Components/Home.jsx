import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { RecipeContext } from '../App';

export const Home = () => {
  const [recipe, setRecipe] = useState('');
  const [recipesArr, setRecipesArr] = useState([]);
  const { newState, dispatch, setShowFavList} = useContext(RecipeContext);

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

  const addFavRecipe = (recipeObj) => {
    event.preventDefault();
    if(recipeObj.strMeal == ''){
      return;
    };
    const recipe = {
      recipeName: recipeObj.strMeal,
      recipeInstructions: recipeObj.strInstructions,
      recipeImg: recipeObj.strMealThumb,
      recipeSrc: recipeObj.strSource,
      id: new Date().getTime(),
    };
    const action = {
      type: 'add-fav',
      payload: recipe,
    };
    dispatch(action);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    getRecipe();
  }

  const showFavListFunc = () => {
    setShowFavList(true);
  }

  return (
    <>
      <header>
        <h1>Start Cooking!</h1>
        <form action="get-recipe" onSubmit={onSubmit}>
          <label htmlFor="recipe">Search: </label>
          <input type="text" value={recipe} onChange={changeRecipe}/>
          <button onClick={onSubmit} className='look-recipe-up-btn'>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </header>

      <button className='show-fav-recipes' onClick={showFavListFunc}>
        <NavLink to='/favorite-recipes'>
          <i className="fa-regular fa-bookmark"></i>
        </NavLink>
      </button>

      <div className='content-wrapper'>
        {recipesArr.map((recipe)=>(
          <div key={recipe.idMeal} recipe={recipe}>
            <div className='recipe-container'>
              <button className='add-to-fav-button' onClick={() => addFavRecipe(recipe)}>
                <i className="fa-regular fa-bookmark"></i>
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
                  <p>Source: 
                    <a href={recipe.strSource} target='_blank'> click here</a>
                  </p>        
                </div>
              </div>      
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
