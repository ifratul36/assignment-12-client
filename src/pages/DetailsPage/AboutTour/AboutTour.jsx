import React from 'react';

// Sample JSON data
const tourData = {
  "tour": {
    "name": "Majestic Europe Tour",
    "description": "Join us on a magical 10-day journey through Europe, visiting iconic landmarks such as the Eiffel Tower, Colosseum, and the Swiss Alps.",
    "highlights": [
      "Visit the Eiffel Tower in Paris",
      "Explore the Colosseum in Rome",
      "Cruise the canals of Venice",
      "Hike the scenic Swiss Alps"
    ],
    "duration": "10 days",
    "price": {
      "currency": "USD",
      "amount": 1500,
      "details": "All-inclusive package: transportation, meals, and guided tours."
    },
    "location": "France, Italy, Switzerland, UK",
    "booking_info": {
      "contact_number": "+123456789",
      "email": "info@majesticeuropetour.com",
      "website": "https://www.majesticeuropetour.com/book"
    },
    "images": [
      "https://i.ibb.co.com/rygXr3n/362dbc1c.jpg",
      "https://i.ibb.co.com/X54Ltjk/download-4.jpg",
      "https://i.ibb.co.com/kMRDPby/images-12.jpg",
      "https://i.ibb.co.com/L5DTrdN/images-3.jpg",
      "https://i.ibb.co.com/rygXr3n/362dbc1c.jpg",
      "https://i.ibb.co.com/X54Ltjk/download-4.jpg",
      "https://i.ibb.co.com/kMRDPby/images-12.jpg",
      "https://i.ibb.co.com/L5DTrdN/images-3.jpg",
      "https://i.ibb.co.com/rygXr3n/362dbc1c.jpg",
      "https://i.ibb.co.com/X54Ltjk/download-4.jpg",
      "https://i.ibb.co.com/kMRDPby/images-12.jpg",
      "https://i.ibb.co.com/L5DTrdN/images-3.jpg"
    ]
  }
};

const AboutTour = () => {
  return (
    <section className="bg-slate-50 p-8 rounded shadow-lg my-8">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">{tourData.tour.name}</h2>
      <p className="text-lg text-gray-700 mb-6">{tourData.tour.description}</p>

      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Tour Highlights:</h3>
      <ul className="list-disc pl-6 space-y-2 text-gray-700">
        {tourData.tour.highlights.map((highlight, index) => (
          <li key={index}>{highlight}</li>
        ))}
      </ul>

      <div className="tour-details mt-6 space-y-2 text-gray-700">
        <p><strong className="font-semibold">Duration:</strong> {tourData.tour.duration}</p>
        <p><strong className="font-semibold">Price:</strong> {tourData.tour.price.currency} {tourData.tour.price.amount} ({tourData.tour.price.details})</p>
        <p><strong className="font-semibold">Location:</strong> {tourData.tour.location}</p>
      </div>


      <div className="tour-images grid grid-cols-6 grid-rows-2 gap-4 mt-6 h-96 ">
        {tourData.tour.images.map((img, index) => (
          <img key={index} src={img} alt={`Tour Image ${index + 1}`} className="rounded-lg shadow-md w-full h-full" />
        ))}
      </div>
    </section>
  );
};

export default AboutTour;
