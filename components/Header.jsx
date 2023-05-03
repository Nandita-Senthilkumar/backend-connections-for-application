import React, { useState } from 'react'
import {Logo} from "../assets/img"
import { NavLink, useNavigate } from 'react-router-dom'
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import {FaCrown } from 'react-icons/fa'
import { useStateValue } from '../context/StateProvider';
import { getAuth } from 'firebase/auth';
import { app } from '../configuration/firebase.config';
import { motion } from 'framer-motion';


const Header = () => {
  const navigate = useNavigate();
  const [{user},dispatch]=useStateValue();
  const [isMenu, setIsMenu] = useState(false);

  const logout=()=>{
    const firebaseAuth=getAuth(app);
    firebaseAuth.signOut().then(() => {
        window.localStorage.setItem("auth", "false");
      })
      .catch((e) => console.log(e));
    navigate("/login", { replace: true });

  }
  return (
    <header className='flex items-center w-full p-4 md:py-2 md:px-4 '>
        <NavLink to={"/"}>
             <img src={Logo} alt="logo" className='w-16'/>
        </NavLink>
        <ul className='flex items-center justify-center ml-7'>
            <li className='mx-5 text-lg'><NavLink to={"/home" } className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>Home</NavLink></li>
            <li className='mx-5 text-lg'><NavLink to={"/music"}className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>Musics</NavLink></li>
            <li className='mx-5 text-lg'><NavLink to={"/premium"}className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>Premium</NavLink></li>
            <li className='mx-5 text-lg'><NavLink to={"/about"}className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>AboutUs</NavLink></li>
        </ul>
        <div 
        onMouseEnter={() => setIsMenu(true)}
        onMouseLeave={() => setIsMenu(false)}
        className='flex items-centre ml-auto cursor-pointer gap-5 relative'>
            <img src={user?.user.imageURL} className='w-10 h-11  min-w-[44px] object-cover rounded-full shadow-lg' alt='' referrerPolicy='no-referrer'></img>
            <div className='flex flex-col '>
              <p className='text-textColor text-lg hover:text-color1 font-serif'>{user?.user?.name}</p>
              <p className='flex items-center gap-3 text-us text-gray-500 font-normal'>Premium Member<FaCrown className="text-sm -ml-1 text-yellow-500"></FaCrown></p>
            </div>
            {isMenu && (
              <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="absolute z-8 top-14 right-0 w-275 p-5 gap-2 bg-card shadow-lg rounded-lg backdrop-blur-sm flex flex-col" >
            <NavLink to={"/userProfile"}>
              <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
                Profile
              </p>
            </NavLink>
            <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
                Favorites
              </p>
              <hr/>
            {user?.user?.role==="admin" && (
              <>
                <NavLink to={"/dashboard/home"}>
                  <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
                    Dashboard
                  </p>
              </NavLink>
              </>)}


              <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out" onClick={logout}>
                SignOut
              </p>
            </motion.div>
            )}
        </div>
    </header>
  )
}

export default Header
