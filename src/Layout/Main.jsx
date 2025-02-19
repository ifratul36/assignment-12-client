import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../pages/shared/Footer/Footer';
import Navbar from '../pages/shared/Navbar/Navbar';
import Banner from '../pages/Home/Banner/Banner';

const Main = () => {
    return (
        <div>

            <Navbar />
            <Banner />
        <div className='max-w-screen-xl mx-auto'>
            <Outlet />
        </div>
            <Footer />
        </div>
    );
};

export default Main;