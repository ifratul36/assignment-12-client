import React from 'react';
import Banner from '../Banner/Banner';
import { Helmet } from 'react-helmet-async';
import WebsiteOverview from '../WebsiteOverview/WebsiteOverview';
import CustomTab from '../Tab/CustomTab';
import Icon from '../Icon/Icon';
import Scroll from '../Scroll/Scroll';
import Featured from '../Featured/Featured';
import ManageRandomStories from '../../ManageRandomStories/ManageRandomStories';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Assignment | Home</title>
            </Helmet>
            <Banner />
            <WebsiteOverview /> 
            <Scroll />
            <CustomTab />
            <Icon />
            <Featured />
            <ManageRandomStories />
        </div>
    );
};

export default Home;