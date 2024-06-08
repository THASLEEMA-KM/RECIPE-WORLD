import React from 'react'
import View from '../Components/View'
function Landing({addRecipeResponse,setAddFavourites}) {
  

  return (
    
   <>
      <div className='bg-black' style={{overflowX:'hidden',minHeight:'100vh',marginTop:'0px'}}>
  
        <View setAddFavourites={setAddFavourites} addRecipeResponse={addRecipeResponse}/>
  
  
      </div>
   </>
  )
}

export default Landing