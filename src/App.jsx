import { Routes, Route, Navigate } from 'react-router-dom';
import './Styles/App.css'
import { createContext, useReducer, useState } from 'react'
import { FavRecipesComp } from './Components/FavRecipesComp';
import { Home } from './Components/Home';
import { NavLink } from 'react-router-dom';

const initialState = [{
  recipeName: '',
  recipeInstructions: '',
  recipeImg: '',
  recipeSrc: '',
  id: new Date().getTime(),
}];

const reducer = (state = initialState, action =   {}) => {
  switch(action.type){
    case 'add-fav':
      console.log(action.payload);
      return [...state, action.payload];
    case 'remove-fav':
      return(
        state.filter(recipe => recipe.id !== action.payload)
      );
    default:
      return state
  }
}

export const RecipeContext = createContext();

export const App = () => {
  const [showFavList, setShowFavList] = useState(false);
  const [newState, dispatch] = useReducer(reducer, initialState)
  
  return (
    <RecipeContext.Provider value={{
      showFavList,
      setShowFavList,
      newState,
      dispatch
    }}>
  
      <Routes>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/favorite-recipes' element={<FavRecipesComp/>}></Route>
        <Route path='/*' element={ <Navigate to={'/home'}></Navigate>}></Route>
      </Routes>
    </RecipeContext.Provider>
  )
}
