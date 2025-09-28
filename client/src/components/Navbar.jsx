import React from 'react'
import { useNavigate } from 'react-router-dom'

    const navbar = () => {
      const navigate = useNavigate();
    
      const handleClick = () => {
        navigate('/');
      };

  return (
    <div>
      <header className='flex justify-around items-center h-15 w-100% px-6 py-4 '>
        <div className='font-bold text-xl'>
            logo
        </div>
        <ul className='flex space-x-6'>
            <li  onClick={handleClick} className='cursor-pointer   hover:text-white transition 0.3s ease-in-out'>Home</li>
        </ul>
      </header>
    </div>
  )
}

export default navbar
