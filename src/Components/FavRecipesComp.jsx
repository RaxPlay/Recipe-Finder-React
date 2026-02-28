import { useActionState, useContext } from "react"
import { RecipeContext } from "../App"
import { NavLink, useActionData } from "react-router-dom";

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
      {showFavList ? (
        <div>
          {newState.map(recipe => {
            return (
              <li className=''>
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
            )
          })}
        </div>
      ) : "nothing here"}

      <button className='show-home'>
        <NavLink to='/home'>
          <i class="fa-solid fa-arrow-left"></i>
        </NavLink>
      </button>
    </>
  )
}
