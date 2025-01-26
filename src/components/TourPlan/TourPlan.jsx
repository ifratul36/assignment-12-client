import React, { useState } from 'react';
import { VscChevronDown } from "react-icons/vsc";
import { VscChevronUp } from "react-icons/vsc";

const TourPlan = () => {
  const tourDays = [
    {
      day: 'Day 1',
      highlights: 'One World Trade Center, 9/11 Memorial, Staten Island Ferry, and SoHo',
      description: 'Begin your journey with a visit to the iconic One World Trade Center, followed by a reflective moment at the 9/11 Memorial. Hop on the Staten Island Ferry for stunning views of the Statue of Liberty and Manhattan skyline. End the day strolling through the chic streets of SoHo, known for its boutique shopping and art galleries.',
    },
    {
      day: 'Day 2',
      highlights: 'Statue of Liberty, Ellis Island, Tenement Museum, and a Food Tour',
      description: 'Start the day by visiting the Statue of Liberty and Ellis Island to explore their historical significance. Dive into immigrant stories at the Tenement Museum. Conclude your day with a guided food tour, indulging in diverse cuisines that define New York City.',
    },
    {
      day: 'Day 3',
      highlights: 'Central Park, Metropolitan Museum of Art (The Met), and Fifth Avenue',
      description: 'Wander through the scenic pathways of Central Park, soaking in its urban serenity. Visit The Met to marvel at world-class art collections from various eras. Wrap up your day by exploring the upscale boutiques and landmarks along Fifth Avenue.',
    },
    {
      day: 'Day 4',
      highlights: 'St. Patrick\'s Cathedral, Rockefeller Center, and Times Square',
      description: 'Admire the Gothic splendor of St. Patrick\'s Cathedral, then head to Rockefeller Center for its art deco architecture and vibrant surroundings. End the trip on a high note amidst the bustling energy of Times Square.',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="tour-plan w-3/4 mx-auto mt-10">
      {tourDays.map((day, index) => (
        <div
          key={index}
          className="border-b border-gray-300 pb-2 mb-4"
        >
          <button
            onClick={() => toggleAccordion(index)}
            className="flex justify-between items-center w-full text-left p-4 bg-gray-100 hover:bg-gray-200 focus:outline-none"
          >
            <span className="text-lg font-bold">{day.day}</span>
            <span className="text-xl text-blue-500">
              {activeIndex === index ? <VscChevronUp /> : <VscChevronDown />}
            </span>
          </button>
          {activeIndex === index && (
            <div className="p-4 bg-white">
              <p className="text-sm text-gray-500 mb-2">
                <strong>Highlights:</strong> {day.highlights}
              </p>
              <p>{day.description}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};



export default TourPlan;
