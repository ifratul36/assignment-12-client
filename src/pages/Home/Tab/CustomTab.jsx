import React, { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Helmet } from 'react-helmet-async';
import Tour from '../Tour/tour';
import MeetTourGuide from '../../DetailsPage/MeetTourGuide/MeetTourGuide';

const CustomTab = () => {
    const [tabIndex, setTabIndex] = useState(0); // Declare tabIndex state
  const items = []; // Replace with your actual data
  
    return (
        <div>
             <Helmet>
        <title>Assignment 12 | Our Packages</title>
      </Helmet>
        <div className="my-8">
        <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <div className="md:w-[27%] mx-auto">
            <TabList>
              <Tab>Our Packages</Tab>
              <Tab>Meet Our Tour Guides</Tab>
            </TabList>
          </div>
          <TabPanel>
            <Tour />
          </TabPanel>
          <TabPanel>
            <MeetTourGuide />
          </TabPanel>
        </Tabs>
      </div>

        </div>
    );
};

export default CustomTab;