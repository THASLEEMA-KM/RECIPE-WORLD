import React, { useEffect, useState } from 'react'
import { Row,Col } from 'react-bootstrap'
import Foodcard from '../Components/FoodCard'
import { getAllRecipeAPI } from '../Services/allAPI'
// import logoimg from '../assets/logo1.png'

function View({addRecipeResponse,setAddFavourites}) {
  const [deleteResponse,setDeleteResponse] = useState("")
const [allRecipies,setAllRecipies] = useState([])
console.log(allRecipies);

useEffect(()=>{
  getAllRecipies()

},[addRecipeResponse,deleteResponse])

const getAllRecipies = async () =>
  {
    try {
      const result = await getAllRecipeAPI()
      console.log(result);
      if(result.status>=200 && result.status<300)
        {
          setAllRecipies(result.data)
        }
    } catch (error) {
      console.log(error);
    }
  }
  return (
<>
      <div className='pt-5 text-center align-items-center justify-content-center ' style={{border:'1px', borderColor:'black', borderRadius:'50%'}}><h1 className=" text-danger fw-bolder ">All Recipies</h1></div>
      <div className='d-flex flex-column justify-content-between  w-100'>
      <Row >
          {
            allRecipies?.length>0?
            allRecipies?.map(recipies=>(
              <Col key={recipies?.id} className='mb-4' sm={12} md={6} lg={4} xl={3}>
              <Foodcard displaydata={recipies} setAddFavourites={setAddFavourites} setDeleteResponse={setDeleteResponse}/>
          </Col>
            ))
            :
            <div className=' mt-5'>
              <h1 className='ps-5 fw-bolder text-danger'>NOTHING TO DISPLAY!!!!</h1>
            </div>
            }
  
      </Row>
      </div>
</>
  )
}

export default View