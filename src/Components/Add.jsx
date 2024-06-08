import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { addRecipeAPI } from '../Services/allAPI'
import { Toaster, toast } from 'sonner'

function Add({setAddRecipeResponse}) {
    
    const [recipe,setRecipe] = useState(
        {
          caption:'',
          imgURL:'',
          time:'',
          ingredients:'',
          description:''
        }
    )
      const addRecipe = async ()=>
        {
            console.log("inside add function");
            // setRecipe(recipe)
            const {caption,imgURL,time,ingredients,description} = recipe
            if(caption && imgURL && time && ingredients && description)
            {
                console.log("api call");
                try 
                {
                    const result = await addRecipeAPI(recipe)
                    // console.log(result);
                    if (result.status>=200 && result.status<300) 
                    {
                        console.log(result.data);
                        setAddRecipeResponse(result.data)
                        
                        setRecipe({
                            imgURL:'',
                            caption:'',
                            time:'',
                            ingredients:'',
                            description:''
                        })
                        toast.success("New recipe is added to recipe collection")
                        
                    } 
                    else 
                    {
                        console.log(result.response.data);
                    }

                } 
                catch (error) 
                {
                        console.log(error);
                }
                // navigate('/')
            }
            else
            {
                toast.warning("please fill the form")
            }
            
        }
  return (
    <>
        
        <div className='container-fluid w-50 add'>
        <h1 className='text-center pt-5 fw-bolder text-success'>ADD YOUR RECIPE</h1>

            <Form >
                   <Form.Group className="mb-3 text-white" controlId="exampleForm.ControlInput1">
                       <Form.Label>Image</Form.Label>
                       <Form.Control onChange={e=>setRecipe({...recipe,imgURL:e.target.value})} type="text" placeholder="Image url" />
                   </Form.Group>
                   <Form.Group className="mb-3 text-white" controlId="exampleForm.ControlInput1">
                       <Form.Label>Name</Form.Label>
                       <Form.Control onChange={e=>setRecipe({...recipe,caption:e.target.value})} type="text" placeholder="Food name here" />
                   </Form.Group>
                   <Form.Group className="mb-3 text-white" controlId="exampleForm.ControlInput1">
                       <Form.Label>Time</Form.Label>
                       <Form.Control onChange={e=>setRecipe({...recipe,time:e.target.value})} type="email" placeholder="Duration for cooking" />
                   </Form.Group>
                   <Form.Group className="mb-3 text-white" controlId="exampleForm.ControlTextarea1">
                       <Form.Label>Ingredients</Form.Label>
                       <Form.Control onChange={e=>setRecipe({...recipe,ingredients:e.target.value})} as="textarea" rows={3} />
                   </Form.Group>
                   <Form.Group className="mb-3 text-white" controlId="exampleForm.ControlTextarea1">
                       <Form.Label>Description</Form.Label>
                       <Form.Control onChange={e=>setRecipe({...recipe,description:e.target.value})} as="textarea" rows={3} />
                   </Form.Group>
                   </Form>
        </div>
        <div className='text-center justify-content-around'>
        <button onClick={addRecipe} className='btn btn-success'>Add</button>

        </div>

        <Toaster position="top-center" richColors  />


    </>
  )
}

export default Add