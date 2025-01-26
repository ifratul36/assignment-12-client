import React, { useEffect, useState } from 'react';

const MeetTourGuide = () => {
    const [guides, setGuides] = useState([]);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        const fetchGuides = async () => {
            try {
                const response = await fetch('http://localhost:3000/users'); // Replace with your API URL
                const data = await response.json();

                
                const filteredGuides = data.filter(user => user.role === 'tour guide').slice(0, 6);
                setGuides(filteredGuides);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching guides:', error);
                setLoading(false);
            }
        };

        fetchGuides();
    }, []);

    if (loading) {
        return <p>Loading guides...</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {guides.map(guide => (
                <div
                    key={guide.id}
                    className="border rounded-lg shadow-lg p-4 flex flex-col items-center text-center"
                >
                    <img
                        src={guide.image || 'https://via.placeholder.com/150'}
                        alt={guide.name}
                        className="w-32 h-32 rounded-full mb-4"
                    />
                    <h3 className="text-xl font-semibold">{guide.name}</h3>
                    <p className="text-gray-600">{guide.role}</p>
                </div>
            ))}
        </div>
    );
};

export default MeetTourGuide;
