import React from 'react';
import Banner from '../../Components/Banner';
import CategorySlider from '../../Components/CategorySlider';
import PopularMenu from '../../Components/PopularMenu';
import Featured from '../../Components/Featured';
import Testimonials from '../../Components/ReviewTestimonial';

const Home = () => {
    return (
        <div>
            <Banner/>
            <CategorySlider/>
            <PopularMenu/>
            <Featured></Featured>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;