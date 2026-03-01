import { useActionState, useContext } from "react"
import { RecipeContext } from "../App"
import { NavLink, useActionData } from "react-router-dom";
import tumbleweed from '../assets/tumbleweed.mp4'
import '../Styles/App.css'


export const FavRecipesComp = () => {
  const { showFavList, newState, dispatch } = useContext(RecipeContext);

  const deleteFavRecipe = ({ id }) => {
    const action = {
      type: 'remove-fav',
      payload: id,
    };
    dispatch(action);
  }

  return (
    <>
      <header className="fav-recipes-header">
        <h1>Your Saved Recipes</h1>
      </header>

      {showFavList ? (
        <div>
          {newState.map(recipe => {
            return (
              <div>
                <li className='recipe-container'>
                  <button className='remove-fav-button' onClick={() => deleteFavRecipe(recipe)}>
                    <i class="fa-solid fa-trash"></i>
                  </button>
                  <img src={recipe.recipeImg} alt="recipe image"/>
                  <div>
                    <h2>{recipe.recipeName}</h2>
                    <div className='instruction-container'>
                      <h3>Instructions:</h3>
                      <p>{recipe.recipeInstructions}</p>
                    </div>
                    <hr />
                    <div className='source-container'>
                      <p>Source: 
                        <a href={recipe.recipeSrc} target='_blank'> click here</a>
                      </p>        
                    </div>
                  </div>
                </li>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="empty-fav-container">
          <h1>
            Nothing Here...
          </h1>
          <video loop muted autoPlay className="tumbleweed" src={tumbleweed} alt="tumbleweed gif (really funny)"></video>
        </div>
      )}

      <NavLink to='/home'>
        <button className='show-home'>
          <i class="fa-solid fa-arrow-left"></i>
        </button>
      </NavLink>
    </>
  )
}
