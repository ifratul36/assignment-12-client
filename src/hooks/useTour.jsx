// import React, { useEffect, useState } from 'react';
// import useAxiosSecure from './useAxiosSecure';

// const useTour = () => {
//     const axiosSecure = useAxiosSecure()
//     const [tour, setTour] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetch('http://localhost:3000/tour')
//             .then((res) => res.json())
//             .then((data) => {
//                 // Shuffle the data
//                 const shuffledData = data.sort(() => Math.random() - 0.5);
//                 // Get the first 3 items after shuffling
//                 setTour(shuffledData.slice(0, 3));
//                 setLoading(false);
//             });
//     }, []);

//     return [tour, loading];
// };

// export default useTour;




import React, { useEffect, useState } from 'react';
import useAxiosSecure from './useAxiosSecure';

const useTour = () => {
    const axiosSecure = useAxiosSecure(); // Custom hook for Axios Secure
    const [tour, setTour] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await axiosSecure.get('/tours'); // Fetch tours using Axios Secure
                const data = response.data;
                // Shuffle the data
                const shuffledData = data.sort(() => Math.random() - 0.5);
                // Get the first 3 items after shuffling
                setTour(shuffledData.slice(0, 3));
            } catch (error) {
                console.error('Error fetching tours:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTours();
    }, [axiosSecure]);

    return [tour, loading];
};

export default useTour;
