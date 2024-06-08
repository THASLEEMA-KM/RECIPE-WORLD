import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { addFavouriteAPI, removeRecipeAPI, updateRecipeAPI, getSingleRecipeAPI } from '../Services/allAPI';
import { Toaster, toast } from 'sonner';


function FoodCard({ displaydata, setDeleteResponse }) {
  // modal states
  const [show, setShow] = useState(false);
  const [updateRecipe, setUpdateRecipe] = useState(false);

  const [values, setValues] = useState({
    id: displaydata.id ,
      caption: displaydata.caption ,
      imgURL: displaydata.imgURL,
      time: displaydata.time ,
      ingredients: displaydata.ingredients,
      description: displaydata.description 
  });
// moddal func
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClosed = () => setUpdateRecipe(false);

  useEffect(() => {
    setValues({
      id: displaydata.id ,
      caption: displaydata.caption ,
      imgURL: displaydata.imgURL,
      time: displaydata.time ,
      ingredients: displaydata.ingredients,
      description: displaydata.description 
    });
  }, []);


console.log(values);
console.log(displaydata);
  const handleShowing = async (recipeId) => {
    setUpdateRecipe(true);
    try {
      const data = await getSingleRecipeAPI(recipeId);
      console.log(data.data);
      setValues((prevValues) => ({
        ...prevValues,
        caption: data.caption || prevValues.caption,
        imgURL: data.imgURL || prevValues.imgURL,
        time: data.time || prevValues.time,
        ingredients: data.ingredients || prevValues.ingredients,
        description: data.description || prevValues.description,
      }));
    } catch (error) {
      console.error('Error fetching recipe:', error);
      toast.error('Failed to fetch recipe details');
    }
  };

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  

  const handleAddFavourite = async () => {
    const { caption, imgURL, time, ingredients, description } = displaydata;
    const favourites = { caption, imgURL, time, ingredients, description };

    try {
      await addFavouriteAPI(favourites);
      toast.success(`${favourites.caption} is added to your favourites`);
    } catch (error) {
      console.log(error);
      toast.error('Failed to add favourite');
    }

    handleClose();
  };

  const handleRemoveRecipe = async (recipeId) => {
    try {
      const result = await removeRecipeAPI(recipeId);
      setDeleteResponse(result.data);
    } catch (error) {
      console.log(error);
      toast.error('Failed to remove recipe');
    }
  };

  const handleUpdateRecipe = async () => {
    try {
      const result = await updateRecipeAPI(values.id,values);
      if (result.status >= 200 && result.status < 300) {
        toast.success('Recipe updated successfully');
        handleClosed();
      } else {
        toast.error('Failed to update recipe');
      }
    } catch (error) {
      console.error('Update API call error:', error);
      toast.error('Failed to update recipe');
    }
  };

  return (
    <>
    
      <div className='container-fluid justify-content-between align-items-center pt-5 ps-4'>
        <Card style={{ width: '18rem' }} className='rounded shadow-5 bg-black'>
          <Card.Img variant="top" height={'200px'} src={displaydata?.imgURL} className='rounded-5'/>
          <Card.Body className='bg-black rounded-5'>
            <Card.Title className='text-center text-white fs-2'>{displaydata?.caption}</Card.Title>
            <Card.Text className='text-center text-white fs-5'>
              <i className="fa-solid fa-stopwatch me-2 text-black"></i>Prep.Time: {displaydata?.time} Minutes
            </Card.Text>
            <div className='d-flex justify-content-center'>
              <button  onClick={handleShow}  className='btn'><i className="fa-solid fa-eye text-info"></i> </button>
              <button  onClick={() => handleRemoveRecipe(displaydata?.id)} className='btn  ms-3'> <i className="fa-solid fa-trash text-danger"></i> </button>
              <button  onClick={() => handleShowing(displaydata?.id)} className='btn ms-3 text-warninf'> <i className="fa-solid fa-pen text-warning"></i> </button>
            </div>
          </Card.Body>
        </Card>

        <Modal size="lg" show={show} onHide={handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title><h1 className='text-info'>{displaydata?.caption}-Recipe</h1></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Modal.Title><h3 className='text-warning'><i className="fa-solid fa-stopwatch text-white"></i>Prep.Time: {displaydata?.time} Minutes</h3></Modal.Title>
            <h3 className='text-success'>Ingredients</h3>
            <p>{displaydata?.ingredients}</p>
            <h3>Description</h3>
            <p>{displaydata?.description}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            <Button onClick={handleAddFavourite} variant="success"><i className="fa-solid fa-heart-circle-plus"></i></Button>
          </Modal.Footer>
        </Modal>

        <Modal show={updateRecipe} onHide={handleClosed}>
          <Modal.Header closeButton>
            <Modal.Title>Update Recipe</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formCaption">
                <Form.Label>Caption</Form.Label>
                <Form.Control
                  type="text"
                  name="caption"
                  value={values.caption}
                  onChange={handleInputChange}
               
                  placeholder="Name of the food"
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formImgURL">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  name="imgURL"
                  value={values?.imgURL}
                  onChange={handleInputChange}
              
                  placeholder="Image URL"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formTime">
                <Form.Label>Time</Form.Label>
                <Form.Control
                  type="text"
                  name="time"
                  value={values?.time}
                  onChange={handleInputChange}
                  
                  
                  placeholder="Preparation Time"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formIngredients">
                <Form.Label>Ingredients</Form.Label>
                <Form.Control
                  type="text"
                  name="ingredients"
                  value={values?.ingredients}
                  onChange={handleInputChange}
               
                  placeholder="Ingredients"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  rows={3}
                  value={values ?.description}
                  onChange={handleInputChange}
                 
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
      <Toaster />
    </>
  );
}

export default FoodCard;
