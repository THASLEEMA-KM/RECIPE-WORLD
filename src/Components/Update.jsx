import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {  updateRecipeAPI } from '../Services/allAPI';

function Update({displaydata}) {



    // const [updateRecipe, setUpdateRecipe] = useState(false);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow= () => setShow(true);

    const [values,setValues] = useState({
      id:displaydata.id,
      caption: displaydata.caption,
      imgURL: displaydata.imgURL,
      time: displaydata.time,
      ingredients: displaydata.ingredients,
      description: displaydata.description
})


    // const [recipeDetails, setRecipeDetails] = useState({
    //   caption: displaydata.caption,
    //   imgURL: displaydata.imgURL,
    //   time: displaydata.time,
    //   ingredients: displaydata.ingredients,
    //   description: displaydata.description
    // });
    useEffect(() => {
      setValues({
      caption: displaydata.caption,
      imgURL: displaydata.imgURL,
      time: displaydata.time,
      ingredients: displaydata.ingredients,
      description: displaydata.description,
      });
    }, [displaydata]);
    
    // const handleShowing = async (recipeId) =>{ 
      
    //   setUpdateRecipe(true);
    //   const data = await getSingleRecipeAPI(recipeId)
    //   console.log(data);
    // }


    // const handleUpdateRecipe = async (recipeId) =>
    //     {
    //       const result = await updateRecipeAPI(recipeId,values ) 
    //       console.log(result.data);
    //       setValues({
    //                       caption:'',
    //                       imgURL:'',
    //                       time:'',
    //                       ingredients:'',
    //                       description:''
    //                     })
    
    //       handleClosed()
    //     }


        const handleUpdateRecipe = (recipeId) => {
            const updatedDetails = {
                caption: values.caption,
                imgURL: values.imgURL,
                time: values.time,
                ingredients: values.ingredients,
                description: values.description
            };
            updateRecipeAPI(recipeId,updatedDetails);
            // window.location.href = '/';
            alert("updated successfullly")
            handleClose();
          };   
  return (
    <div>
        <div onClick={handleShow}>
        <i className="fa-solid fa-pen"></i>
      </div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={values.caption}
              onChange={(e) =>
                setValues({
                  ...values,
                  caption: e.target.value,
                })
              }

                // defaultValue={displaydata?.caption}
                // onChange={(e)=>changeCaption(e)}
                // onChange={(e)=>changeRecipe(setValues({...values,caption:e.target.value}))}

                placeholder="Name of the food"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ImageURL</Form.Label>
              <Form.Control
                type="text"
                value={values.imgURL}
              onChange={(e) =>
                setValues({
                  ...values,
                  imgURL: e.target.value,
                })
              }
                // defaultValue={displaydata?.imgURL}
                // onChange={(e)=>changeImage(e)}
                // onChange={(e)=>changeRecipe(setValues{...values,imgURL:e.target.value})}
                placeholder="Image URL"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="text"
                value={values.time}
                onChange={(e) =>
                  setValues({
                    ...values,
                    time: e.target.value,
                  })
                }


                // defaultValue={displaydata?.time}
                // onChange={(e)=>changeTime(e)}
                // onChange={(e)=>changeRecipe({...values,time:e.target.value})}
                placeholder="Preperation Time"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Ingredients</Form.Label>
              <Form.Control
                type="text"
                value={values.ingredients}
                onChange={(e) =>
                  setValues({
                    ...values,
                    ingredients: e.target.value,
                  })
                }

                // defaultValue={displaydata?.ingredients}
                // onChange={(e)=>changeIngreients(e)}
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

              value={values.description}
              onChange={(e) =>
                setValues({
                  ...values,
                  description: e.target.value,
                })
              }
              // defaultValue={displaydata?.description}
              // onChange={(e)=>changeDescription(e)}
              // onChange={(e)=>changeRecipe({...values,description:e.target.value})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>handleUpdateRecipe(displaydata?.id)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


    </div>
  )
}

export default Update