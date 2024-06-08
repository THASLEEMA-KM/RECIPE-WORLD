
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './Components/Footer'
import Header from './Components/Header'
import Add from './Components/Add'
import Home from './Pages/Home'
import Landing from './Pages/Landing'
import Favourites from './Pages/Favourites'
import { useEffect, useState } from 'react'
import Loading from './Components/Loading/Loading'
import Update from './Components/Update'


function App() {

const [addRecipeResponse,setAddRecipeResponse] = useState("")

let [loading, setLoading] = useState(false);


// preloading function 
useEffect(()=>{
  setLoading(true);
  setTimeout(()=>{
    setLoading(false);
  },5000);
},[])


  return (
    <div className='maindiv' style={{minHeight:'100vh'}}>

{
   loading?
   <Loading/>
   :
   <>
       <Header/>
       <Routes>
        <Route element={<Landing addRecipeResponse={addRecipeResponse} />} path='/'></Route>
        <Route element={<Home/>} path='/home'></Route>
        <Route element={<Add setAddRecipeResponse={setAddRecipeResponse}/>} path='/add'></Route>
        <Route element={<Add insideUpdate={true}/>} path='/:id/update'></Route>

        {/* <Route element={<Update />} path='/update'></Route> */}
        <Route element={<Favourites />} path='/favourites'></Route>
       </Routes>
       <Footer/>
       
   </>
     }
    </div>
  )
}

export default App
