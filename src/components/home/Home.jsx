import React from 'react';
import Header from '../header/Header';
import HomeBody from './HomeBody';
import HomeSlider from './HomeSlider';

const Home = () => {
    return (
        <div>
            <Header/>
           <HomeSlider/>
            <HomeBody/>
           
        </div>
    );
};

export default Home;