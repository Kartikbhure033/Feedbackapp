import React from 'react'
import Navbar from './Navbar'
import { Navigate, useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/students');
  };


  return (
    <div className='h-screen w-full flex flex-col'>
      <Navbar/>
      <section className='flex-1 flex justify-center items-center'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold mb-4'>"your voice matters"</h1>
          <h3 className='text-xl  mb-6'>"Share your college feedback"</h3>
           <button onClick={handleClick} className='bg-gray-400 px-10 py-2 mt-5 rounded-2xl hover:bg-gray-300 transition 0.3s ease-in-out'>Feedback</button>
        </div>
      </section>
    </div>
  )
}

export default Hero
