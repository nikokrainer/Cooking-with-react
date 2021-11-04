import React, { useState, useEffect } from "react"
import RecipeList from "./RecipeList"
import RecipeEdit from "./RecipeEdit"
import "../scss/app.scss"
import { v4 as uuidv4 } from "uuid"

export const RecipeContext = React.createContext()

const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes'

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState()
  const [recipes, setRecipes] = useState(sampleRecipes)
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId)
  //
  useEffect(()=>{
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY) // ili ce nam vratit item ili nam nece vratit nista(null)
    if (recipeJSON != null) setRecipes(JSON.parse(recipeJSON)) 
  }, [])

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes])
  //
  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange
  }
  //
  function handleRecipeChange(id, recipe){
    const newRecipes = [...recipes]
    const index = newRecipes.findIndex(r => r.id === id)
    newRecipes[index] = recipe
    setRecipes(newRecipes)
  }

  //
  function handleRecipeSelect(id){
    setSelectedRecipeId(id)
  }
  //
  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: "",
      servings: 1,
      cookTime: "",
      instructions: "",
      ingredients: [{ id: uuidv4(), name: "", amount: "" }],
    }
    setSelectedRecipeId(newRecipe.id)
    setRecipes([...recipes, newRecipe])
  }
  //
  function handleRecipeDelete(id) {
    if(selectedRecipeId != null && selectedRecipeId === id){
      setSelectedRecipeId(undefined)
    }
    
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }
  //
  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes} />
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />} 
    </RecipeContext.Provider>
  )
}

const sampleRecipes = [
  {
    id: 1,
    name: "Plain Chicken",
    servings: 3,
    cookTime: "1:45",
    instructions:
      "1. Put salt on Chicken\n2. Put Chicken in oven\n3. Eat the chicken",
    ingredients: [
      {
        id: 1,
        name: "chicken",
        amount: "2 pounds",
      },
      {
        id: 2,
        name: "Salt",
        amount: "1 Tbs",
      },
    ],
  },
  {
    id: 2,
    name: "Plain Pork",
    servings: 5,
    cookTime: "0:45",
    instructions:
      "1. Put paprika on Pork\n2. Put Pork in oven\n3. Eat the Pork",
    ingredients: [
      {
        id: 1,
        name: "pork",
        amount: "3 pounds",
      },
      {
        id: 2,
        name: "Paprika",
        amount: "2 Tbs",
      },
    ],
  },
]

export default App
