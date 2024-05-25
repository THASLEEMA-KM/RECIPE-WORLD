import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { addFavouriteAPI,removeRecipeAPI,updateRecipeAPI,getSingleRecipeAPI} from '../Services/allAPI';
import { Toaster, toast } from 'sonner'

function FoodCard({displaydata,setDeleteResponse}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [updateRecipe, setUpdateRecipe] = useState(false);

  const handleClosed = () => setUpdateRecipe(false);
  const handleShowing = () => setUpdateRecipe(true);

  const handleAddFavourite = async ()=>
    {

      const {caption,imgURL,time,ingredients,description} = displaydata
      const favourites = {caption,imgURL,time,ingredients,description} 
  console.log("inside addfav function");
      
         try {
          await addFavouriteAPI(favourites)
         } catch (error) {
          console.log(error);
         }
 

  // setAddFavourites([1,2])
  toast.success(`${favourites.caption} is added to your favourites`)
      
      handleClose()
    }

  const handleRemoveRecipe = async (recipeId)  =>
    {
      try {
        const result = await removeRecipeAPI(recipeId) 
        setDeleteResponse(result.data)
      } catch (error) {
        console.log(error);
      }
    }

    const handleUpdateRecipe = async (recipeId) =>
      {
        handleShowing()
        try {
          const {data} = await getSingleRecipeAPI(recipeId)
          console.log(data);

          const result = await updateRecipeAPI(recipeId) 
          console.log(result.data);
        } catch (error) {
          console.log(error);
        }
      }
  return (
    <>
   <div className='container-fluid justify-content-between pt-5'>
        <Card  style={{ width: '18rem' }}>
          <Card.Img variant="top" height={'200px'} src={displaydata?.imgURL} />
          <Card.Body>
            <Card.Title className='text-center fs-2'>{displaydata?.caption}</Card.Title>
            <Card.Text className='text-center fs-4'><i className="fa-solid fa-stopwatch-20"></i>Prep.Time  : 
              {displaydata?.time} Mins
            </Card.Text>
            <div className='d-flex justify-content-evenly'>
              <Button onClick={handleShow} variant="primary" className='btn'>View Recipe</Button>
              <Button variant="danger" onClick={()=>handleRemoveRecipe(displaydata?.id)} className='btn ms-auto'>DELETE</Button>
              <Button variant="warning" onClick={()=>handleUpdateRecipe(displaydata?.id)} className='btn ms-auto'>EDIT</Button>
              {/* <Button variant="warning" onClick={()=>handleUpdateRecipe(displaydata?.id)} className='btn ms-auto'>EDIT</Button> */}



            </div>          
          </Card.Body>
        </Card>
        <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header  closeButton>
          <Modal.Title ><h1 className='text-info'>{displaydata?.caption}-Recipe</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Modal.Title ><h3  className='text-warning'><i className="fa-solid fa-stopwatch-20"></i>Prep.Time  :{displaydata?.time} Mins</h3></Modal.Title>
          <h3  className='text-success'>Ingredients</h3>
          <p>{displaydata?.ingredients}</p>
          <h3>Description</h3>
          <p>{displaydata?.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={()=>handleAddFavourite(displaydata?.id)} variant="success"><i className="fa-solid fa-heart-circle-plus"></i></Button>
        </Modal.Footer>
      </Modal>

            <Modal
        size="lg"
        show={updateRecipe}
        onHide={handleClosed}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header  closeButton>
          <Modal.Title ><h1 className='text-info'>{displaydata?.caption}-Recipe</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={displaydata?.caption}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosed}>
            Close
          </Button>
          <Button onClick={()=>handleUpdateRecipe(displaydata?.id)} variant="success">Update</Button>
        </Modal.Footer>
      </Modal>

   </div>
   <Toaster position="top-center" richColors  />
    </>
  )
}

export default FoodCard