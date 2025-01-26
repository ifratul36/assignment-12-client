import React from 'react';

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className='md:w-4/12 mx-auto text-center my-6'>
            <p className='text-green-600 mb-2'>---{subHeading}--</p>
            <h3 className='text-3xl uppercase border-y-2 py-4 '>{heading}</h3>
        </div>
    );
};

export default SectionTitle;