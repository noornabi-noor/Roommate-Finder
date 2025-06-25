import React from 'react';
import Banner from '../../Components/Banner/Banner';
import Slider from '../../Components/Slider/Slider';
import FeaturedRoommates from '../../Components/FeaturedRoommates/FeaturedRoommates';
import FindMyRoommate from '../../Components/FindMyRoommate/FindMyRoommate';
import Card from './../../Components/Card/Card';
import HowItWorks from './../../Components/HowItWorks/HowItWorks';

const Home = () => {
    return (
        <div>
            <Banner/>
            <Slider/>
            <FeaturedRoommates/>
            <FindMyRoommate/>
            <Card/>
            <HowItWorks/>
        </div>
    );
};

export default Home;