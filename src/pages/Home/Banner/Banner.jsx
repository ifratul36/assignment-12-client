import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import img1 from '../../../assets/1.jpg';
import img2 from '../../../assets/2.jpg';
import img3 from '../../../assets/3.jpg';
import img4 from '../../../assets/4.jpg';
import img5 from '../../../assets/5.jpg';
import img6 from '../../../assets/6.jpg';

const Banner = () => {
    return (
        <div>
             <Carousel>
                <div className='w-[100%] h-[600px]'>
                    <img src={img1} className='w-full h-full' />
                </div>
                <div className='w-[100%] h-[600px]'>
                    <img src={img2} className='w-full h-full'/>
                </div>
                <div className='w-[100%] h-[600px]'>
                    <img src={img3} className='w-full h-full'/>
                </div>
                <div className='w-[100%] h-[600px]'>
                    <img src={img4} className='w-full h-full'/>
                </div>
                <div className='w-[100%] h-[600px]'>
                    <img src={img5} className='w-full h-full'/>
                </div>
                <div className='w-[100%] h-[600px]'>
                    <img src={img6} className='w-full h-full'/>
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;