import React from 'react';
import Navbar from '../pages/shared/Navbar/Navbar';
import Footer from '../pages/shared/Footer/Footer';
import BookingForm from '../pages/DetailsPage/BookingForm/BookingForm';
import Gallery from '../pages/DetailsPage/Gallery/Gallery';
import AboutTour from '../pages/DetailsPage/AboutTour/AboutTour';
import TourPlan from '../components/TourPlan/TourPlan';
import Community from '../pages/DetailsPage/Community/Community';


const DetailsPage = () => {
    return (
        <div className='max-w-screen-xl mx-auto'>
            <Navbar />
            <Gallery />
            <AboutTour />
            <BookingForm />
            <TourPlan />
            <Footer />
        </div>
    );
};

export default DetailsPage;