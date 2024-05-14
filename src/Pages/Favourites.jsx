import React, { useEffect, useState } from 'react'
import { Row,Card, Col, Button } from 'react-bootstrap'
import { getAllFavouritesAPI,removeFavouriteAPI } from '../Services/allAPI'


function Favourites() {
    const [allFavourites,setAllFavourites] = useState([])
    console.log(allFavourites);
    useEffect(()=>{
        getAllFavourites()
    },[])

        const getAllFavourites = async () =>
            {
                try {
                    const result = await getAllFavouritesAPI()
                    setAllFavourites(result.data)
                } catch (error) {
                    console.log(error);
                }
            }
            const handleRemoveFavourite = async (favId)=>
            {
                try {
                    await removeFavouriteAPI(favId)
                    getAllFavourites()
                } catch (error) {
                    console.log(error);
                }
            }
  return (
    <>
        <h1 className=' text-center fw-bolder pt-5 text-warning'>Favourites</h1>
        <Row className='container-fluid' style={{minHeight:'100vh'}}>
        {
        allFavourites.length>0?
        allFavourites?.map((item)=>(
        <Col key={item?.id} className='mb-4' sm={12} md={6} lg={4}>
                <Card  style={{ width: 'auto' }}>
                <Card.Img variant="top" height={'200px'} src={item?.imgURL} />
                <Card.Body>
                  <Card.Title className='text-center fs-2'>{item?.caption}</Card.Title>
                  <Card.Text className='text-center fs-4'><i className="fa-solid fa-stopwatch-20"></i>Prep.Time  : 
                    {item?.time}
                  </Card.Text>
                  <Card.Text>
                    {item?.description} 
                  </Card.Text>
                  <div className='text-center justify-content-center'>
                    {/* <Button onClick={handleShow} variant="primary" className='btn'>View Recipe</Button> */}
                    <Button variant="danger" onClick={()=>handleRemoveFavourite(item?.id)} className='btn'><i className="fa-solid fa-heart-circle-minus"></i></Button>
       
                  </div>          
                </Card.Body>
              </Card>
        </Col>
        ))
        :
            <div className='justify-content-center align-items-center'>
                 <h1 className='text-center pt-5 text-danger'>YOUR FAVOURITE LIST IS EMPTY</h1>
            </div>

       }

        </Row>
    </>
  )
}

export default Favourites