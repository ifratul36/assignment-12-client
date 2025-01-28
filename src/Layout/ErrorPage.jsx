import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='bg-[#E6F9DC] flex justify-center items-center w-full min-h-screen text-center font-roboto '>
            <div className='space-y-2'>
            <h2 className='text-4xl font-bold'>404</h2>
            <p className='text-xl font-semibold'>Page Not Found !</p>
            <Link to="/" className='btn btn-neutral w-[150px]'>Go Home</Link>
            </div>
        </div>
    );
};

export default ErrorPage;