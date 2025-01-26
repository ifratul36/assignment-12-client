import React from 'react';
import useTour from '../../../hooks/useTour';
import TourCard from './TourCard';

const Tour = () => {
    const [tour] = useTour();
    return (
        <div className='my-9'>
        <ul className='grid md:grid-cols-3 grid-cols-1 w-[95%] gap-4'>
            {tour.map((item, index) => (
                <TourCard item={item} key={index}/>
            ))}
        </ul>
    </div>
    );
};

export default Tour;