import React, { useCallback } from 'react'
import axios from 'axios';
import userStore from '../store/userStore';
import { Link, useNavigate } from 'react-router-dom';



const Menu = () => {
  const { user } = userStore((state) => state.user)
  const navigate = useNavigate();

  const logUserOut = useCallback(async (params) => {
    try {
        const res = await axios.post('/api/auth/logout', {withCredentials: true})
        user: null
        navigate('/login')
    } catch (error) {
        console.error("Error:",error);
    }
  })

  return (
    <div className='bg-primary w-[220px] z-30 flex flex-col items-start absolute top-12 right-6 md:right-32 border-l-1 border-l-gray-300 p-4 space-y-4'>
        { 
        !user &&  <Link to='/login' className='text-base bg-accent text-small-size hover:bg-black cursor-pointer'>Login</Link>
        }

        {
        !user &&  <Link to='/register' className='text-accent bg-transparent border-1 border-accent text-small-size hover:bg-black cursor-pointer'>Sign Up</Link>
        }
        
        {
        !user &&  <Link to={'/profile:' + user._id} className='text-gray-500 bg-transparent border-1 border-gray-300 text-small-size hover:bg-black cursor-pointer rounded-full'>You</Link>
        }
        {
        !user &&  <Link to='/create' className='text-base bg-accent text-small-size hover:bg-black cursor-pointer'>Write Something</Link>
        }
        {
        !user &&  <Link to={'/myblogs:' + user._id} className='text-base bg-accent text-small-size hover:bg-black cursor-pointer'>My Blogs</Link>
        }
        
        {
        !user &&  <button  
                     className='text-accent bg-transparent border-1 border-accent text-small-size hover:bg-black cursor-pointer'
                     onClick={() => logUserOut()}
                     >Logout</button>
        }
    </div>
  )
}

export default Menu;