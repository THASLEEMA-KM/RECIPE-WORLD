import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { addFavouriteAPI,removeRecipeAPI,updateRecipeAPI,getSingleRecipeAPI} from '../Services/allAPI';
import { Toaster, toast } from 'sonner'
// import { Link } from 'react-router-dom';

function FoodCard({displaydata,setDeleteResponse}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [updateRecipe, setUpdateRecipe] = useState(false);

  const handleClosed = () => setUpdateRecipe(false);

  const handleShowing = async (recipeId) =>{ 
    
    setUpdateRecipe(true);
    const data = await getSingleRecipeAPI(recipeId)
    console.log(data);
  }

  const [values,setValues] = useState({
          caption:'',
          imgURL:'',
          time:'',
          ingredients:'',
          description:''
  })

    const changeCaption = (e) =>
    {
      console.log("inide edit");
      // setValues(e.target.value)
      setValues({...values,caption:e.target.value})
      console.log(values);
    }
    // console.log(values);
    const changeImage = (e) =>
      {
        console.log("inide edit");
        // setValues(e.target.value)
        setValues({...values,imgURL:e.target.value})
        console.log(values);
      }
      const changeTime = (e) =>
        {
          console.log("inide edit");
          // setValues(e.target.value)
          setValues({...values,time:e.target.value})
          console.log(values);
        }
        const changeIngreients = (e) =>
          {
            console.log("inide edit");
            // setValues(e.target.value)
            setValues({...values,ingredients:e.target.value})
            console.log(values);
          }
          const changeDescription = (e) =>
            {
              console.log("inide edit");
              // setValues(e.target.value)
              setValues({...values,description:e.target.value})
              console.log(values);
            }
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

    // const handleUpdateRecipe = async (recipeId) =>
    //   {
    //     console.log("updating call");

    //     const {caption,imgURL,time,ingredients,description} = values
    //     if(caption && imgURL && time && ingredients && description)
    //       {
    //         console.log("updating call");
    //        if(result.status>200 && result.status<300)
    //         {
    //           try {
          
    //             const result = await updateRecipeAPI(recipeId,values ) 
    //             console.log(result.data);
  
    //             setValues({
    //               caption:'',
    //               imgURL:'',
    //               time:'',
    //               ingredients:'',
    //               description:''
    //             })
    //             console.log(result.data);

    //           } catch (error) {
    //             console.log(error);
    //           }
    //         }
    //         else 
    //         {
    //           console.log(result.response.data);
    //         }

    //       }
    //       else{
    //         alert("ryhtdgf")
    //       }
    //       // handleClosed()

        
    //   }
  const handleUpdateRecipe = async (recipeId) =>
    {
      const result = await updateRecipeAPI(recipeId,values ) 
      console.log(result.data);
      setValues({
                      caption:'',
                      imgURL:'',
                      time:'',
                      ingredients:'',
                      description:''
                    })

      handleClosed()
    }

  return (
    <>
   <div className='container-fluid justify-content-between pt-5'>
        <Card  style={{ width: '18rem' }}>
          <Card.Img variant="top" height={'200px'} src={displaydata?.imgURL} />
          <Card.Body>
            <Card.Title className='text-center fs-2'>{displaydata?.caption}</Card.Title>
            <Card.Text className='text-center fs-4'><i className="fa-solid fa-stopwatch-20"></i>Prep.Time  : 
              {displaydata?.time}
            </Card.Text>
            <div className='d-flex justify-content-evenly'>
              <Button onClick={handleShow} variant="primary" className='btn'>View Recipe</Button>
              <Button variant="danger" onClick={()=>handleRemoveRecipe(displaydata?.id)} className='btn ms-auto'>DELETE</Button>
              <Button variant="warning" onClick={()=>handleShowing(displaydata?.id)} className='btn ms-auto'>EDIT</Button>
              {/* <Link to={`/:${displaydata?.id}/add`}><Button insideAdd={insideAdd} variant="warning" onClick={()=>handleUpdateRecipe(displaydata?.id)} className='btn ms-auto'>EDIT</Button></Link> */}



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

      <Modal show={updateRecipe} onHide={handleClosed}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                defaultValue={displaydata?.caption}
                onChange={(e)=>changeCaption(e)}
                // onChange={(e)=>changeRecipe(setValues({...values,caption:e.target.value}))}

                placeholder="Name of the food"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ImageURL</Form.Label>
              <Form.Control
                type="text"
                defaultValue={displaydata?.imgURL}
                onChange={(e)=>changeImage(e)}
                // onChange={(e)=>changeRecipe(setValues{...values,imgURL:e.target.value})}
                placeholder="Image URL"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="text"
                defaultValue={displaydata?.time}
                onChange={(e)=>changeTime(e)}
                // onChange={(e)=>changeRecipe({...values,time:e.target.value})}
                placeholder="Preperation Time"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Ingredients</Form.Label>
              <Form.Control
                type="text"
                defaultValue={displaydata?.ingredients}
                onChange={(e)=>changeIngreients(e)}
              // onChange={(e)=>changeRecipe({...values,ingredients:e.target.value})}
                placeholder="Ingredients"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3}
              placeholder="Description "
              defaultValue={displaydata?.description}
              onChange={(e)=>changeDescription(e)}
              // onChange={(e)=>changeRecipe({...values,description:e.target.value})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosed}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>handleUpdateRecipe(displaydata?.id)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

   </div>
   <Toaster position="top-center" richColors  />
    </>
  )
}

export default FoodCard