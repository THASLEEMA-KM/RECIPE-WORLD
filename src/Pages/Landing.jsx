import React from 'react'
import View from '../Components/View'
function Landing({addRecipeResponse,setAddFavourites}) {
  

  return (
    <div style={{overflowX:'hidden',minHeight:'100vh'}}>

      <View setAddFavourites={setAddFavourites} addRecipeResponse={addRecipeResponse}/>


    </div>
  )
}

export default Landing