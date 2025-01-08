import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Shared/Footer';
import NavBar from '../Shared/Navbar';

const MainlayOut = () => {
    const location = useLocation()
    const noheader = location.pathname.includes('login') || location.pathname.includes('signUp')
    return (
        <div className='container mx-auto'>
          {noheader ||   <NavBar></NavBar>}
            <Outlet></Outlet>
           {noheader ||  <Footer></Footer>}
        </div>
    );
};

export default MainlayOut;