import { Breadcrumbs, Link } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox';

const Header = () => {
    const [home , sethome] = useState();
    const [dashboard , setdashboard] = useState();
    const navigate = useNavigate();
    const GotoHome = () => {
      navigate('/');
      sethome(true);
      setdashboard(false);
    }
    const GotoDashboard = () => {
      navigate('/Dashboard');
      sethome(false);
      setdashboard(true);
    }

      const breadcrumbs = [
        <span underline="none" key="1" className={`font-bold hover:cursor-pointer ${home ? 'text-blue-400' : 'text-inherit'}`}  onClick={GotoHome}>
          Home
        </span>,
        <span
          underline='none'
          key="2"
          color="blue"
          className={`font-bold hover:cursor-pointer ${dashboard ? 'text-blue-400' : 'text-inherit'}`}
          onClick={GotoDashboard}
        >
          Dashboard V2
        </span>,
      ];
  return (
    <div className="w-full h-16 flex justify-between items-center pl-8 pr-8 fixed top-0 z-10 bg-white">
        <Breadcrumbs
            separator=">"
            aria-label="breadcrumb"
        >
            {breadcrumbs}
        </Breadcrumbs>


        <SearchBox/>

        
        <div className="h-full w-8 rounded-full hover:cursor-pointer p-2 flex justify-center items-center">
            <img className="h-6 w-6" src="./bell.svg" alt="..." />
        </div>
    </div>
  )
}

export default Header
