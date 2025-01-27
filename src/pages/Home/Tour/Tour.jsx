import React, { useState, useEffect } from 'react';
import useTour from '../../../hooks/useTour';
import Confetti from "react-confetti";
import TourCard from './TourCard';

const Tour = () => {
    const [tour] = useTour();
    const [bookingCount, setBookingCount] = useState(0);
    const [showDiscount, setShowDiscount] = useState(false);

    // Triggering the confetti and congratulatory message when booking count reaches 3
    useEffect(() => {
        if (bookingCount >= 3) {
            setShowDiscount(true);
        }
    }, [bookingCount]);

    // To control the width and height of the Confetti
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    // Update window size on resize
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Close the congratulatory modal
    const handleCloseModal = () => {
        setShowDiscount(false);
    };

    return (
        <div className="my-9">
            {/* Confetti & Discount Message */}
            {showDiscount && (
                <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
                    <Confetti width={windowWidth} height={windowHeight} />
                    <div className="bg-white shadow-lg rounded-lg p-6 text-center relative animate__animated animate__fadeInUp animate__delay-1s">
                        <button
                            className="absolute top-2 right-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-2 py-1 rounded-full"
                            onClick={handleCloseModal}
                        >
                            ✕
                        </button>
                        <h2 className="text-2xl font-bold text-green-500">Congratulations! 🎉</h2>
                        <p className="mt-4 text-lg">
                            You're one step closer to your next amazing adventure!
                        </p>
                        <p className="mt-2 text-lg font-semibold text-blue-600">
                            Keep exploring, keep booking!
                        </p>
                    </div>
                </div>
            )}

            <ul className="grid md:grid-cols-3 grid-cols-1 w-[95%] gap-4">
                {tour.map((item, index) => (
                    <TourCard item={item} key={index} setBookingCount={setBookingCount} />
                ))}
            </ul>
        </div>
    );
};

export default Tour;
