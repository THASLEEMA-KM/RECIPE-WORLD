import React from 'react'
import loadingAnimation from '../../assets/loading.gif'
function Loading() {
  return (
    <div className='text-center container align-items-center justify-content-center mt-5'>
        <img className='text-center align-items-center justify-content-center mt-5 pt-5' style={{height:'400px',width:'400px'}} src={loadingAnimation} alt="loadinggif" />
    </div>
  )
}

export default Loading