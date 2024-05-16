import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import { addFavouriteAPI, removeRecipeAPI, updateRecipeAPI, getSingleRecipeAPI } from '../Services/allAPI';
import { Toaster, toast } from 'sonner';

function FoodCard({ displaydata, setDeleteResponse }) {
  const [show, setShow] = useState(false);
  const [updateRecipe, setUpdateRecipe] = useState(false);
  const [values, setValues] = useState({
    caption: '',
    imgURL: '',
    time: '',
    ingredients: '',
    description: ''
  });

  useEffect(() => {
    if (updateRecipe) {
      (async () => {
        const data = await getSingleRecipeAPI(displaydata?.id);
        setValues(data);
      })();
    }
  }, [updateRecipe, displaydata?.id]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // const handleShowing = () => setUpdateRecipe(true);
  const handleShowing = async (recipeId) =>{ 
    
    setUpdateRecipe(true);
    const data = await getSingleRecipeAPI(recipeId)
    console.log(data);
  }
  const handleClosed = () => setUpdateRecipe(false);


  const handleAddFavourite = async () => {
    try {
      await addFavouriteAPI(displaydata);
      toast.success(`${displaydata.caption} is added to your favourites`);
    } catch (error) {
      console.error(error);
    }
    handleClose();
  };

  const handleRemoveRecipe = async (recipeId) => {
    try {
      const result = await removeRecipeAPI(recipeId);
      setDeleteResponse(result.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prevState =>({ 
      ...prevState, 
      [name]: value 
    }));
  };

  const handleUpdateRecipe = async () => {
    try {
      const result = await updateRecipeAPI(displaydata.id, values);
      setValues({
        caption: '',
        imgURL: '',
        time: '',
        ingredients: '',
        description: ''
      });
      console.log(result);
      handleClosed();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className='container-fluid justify-content-between pt-5'>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" height={'200px'} src={displaydata?.imgURL} />
          <Card.Body>
            <Card.Title className='text-center fs-2'>{displaydata?.caption}</Card.Title>
            <Card.Text className='text-center fs-4'>
              <i className="fa-solid fa-stopwatch-20"></i> Prep. Time: {displaydata?.time}
            </Card.Text>
            <div className='d-flex justify-content-evenly'>
              <Button onClick={handleShow} variant="primary">View Recipe</Button>
              <Button variant="danger" onClick={() => handleRemoveRecipe(displaydata?.id)}>DELETE</Button>
              <Button variant="warning" onClick={()=>handleShowing(displaydata?.id)}>EDIT</Button>
            </div>
          </Card.Body>
        </Card>

        {/* View Recipe Modal */}
        <Modal size="lg" show={show} onHide={handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title><h1 className='text-info'>{displaydata?.caption} - Recipe</h1></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Modal.Title>
              <h3 className='text-warning'>
                <i className="fa-solid fa-stopwatch-20"></i> Prep. Time: {displaydata?.time} Mins
              </h3>
            </Modal.Title>
            <h3 className='text-success'>Ingredients</h3>
            <p>{displaydata?.ingredients}</p>
            <h3>Description</h3>
            <p>{displaydata?.description}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            <Button onClick={handleAddFavourite} variant="success">
              <i className="fa-solid fa-heart-circle-plus"></i>
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Edit Recipe Modal */}
        <Modal show={updateRecipe} onHide={handleClosed}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Recipe</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formCaption">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="caption"
                  value={values.caption}
                  onChange={handleChange}
                  placeholder="Name of the food"
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formImageURL">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  name="imgURL"
                  value={values.imgURL}
                  onChange={handleChange}
                  placeholder="Image URL"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formTime">
                <Form.Label>Time</Form.Label>
                <Form.Control
                  type="text"
                  name="time"
                  value={values.time}
                  onChange={handleChange}
                  placeholder="Preparation Time"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formIngredients">
                <Form.Label>Ingredients</Form.Label>
                <Form.Control
                  type="text"
                  name="ingredients"
                  value={values.ingredients}
                  onChange={handleChange}
                  placeholder="Ingredients"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  placeholder="Description"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClosed}>Close</Button>
            <Button variant="primary" onClick={handleUpdateRecipe}>Save Changes</Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Toaster position="top-center" richColors />
    </>
  );
}

export default FoodCard;
