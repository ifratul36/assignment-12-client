import React from 'react';
import Banner from '../Banner/Banner';
import { Helmet } from 'react-helmet-async';
import WebsiteOverview from '../WebsiteOverview/WebsiteOverview';
import CustomTab from '../Tab/CustomTab';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Assignment | Home</title>
            </Helmet>
            <Banner />
            <WebsiteOverview /> 
            <CustomTab />
        </div>
    );
};

export default Home;