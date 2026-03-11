import { Routes, Route, Navigate } from 'react-router-dom';
import './Styles/App.css'
import { createContext, useReducer, useState } from 'react'
import { FavRecipesComp } from './Components/FavRecipesComp';
import { Home } from './Components/Home';

const reducer = (state, action = {}) => {
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

function initFunction (initialValue) {
  const items = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);

    try {
      const parsed = JSON.parse(value);

      if (parsed && typeof parsed === "object" && parsed.id) {
        items.push(parsed);
      }

    } catch (error) {
      console.log(error)
    }
  }

  return items.length ? items : initialValue;

}

export const App = () => {
  const [showFavList, setShowFavList] = useState(false);
  const [newState, dispatch] = useReducer(reducer, [], initFunction);

  return (
    <RecipeContext.Provider value={{
      showFavList,
      setShowFavList,
      newState,
      dispatch,
    }}>
  
      <Routes>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/favorite-recipes' element={<FavRecipesComp/>}></Route>
        <Route path='/*' element={ <Navigate to={'/home'}></Navigate>}></Route>
      </Routes>
    </RecipeContext.Provider>
  )
}
