import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import "swiper/css";
import "swiper/css/pagination";

import slide1 from '../../src/assets/home/slide1.jpg';
import slide2 from '../../src/assets/home/slide2.jpg';
import slide3 from '../../src/assets/home/slide3.jpg';
import slide4 from '../../src/assets/home/slide4.jpg';
import slide5 from '../../src/assets/home/slide5.jpg';
import SectionTitle from '../Shared/SectionTitle';

const CategorySlider = () => {
    return (
        <section className="relative">
            <SectionTitle heading='From 11.00am to 10.00pm' subHeading={'Order Online'}/>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper mb-24"
            >
                {[
                    { image: slide1, label: "Salads" },
                    { image: slide2, label: "Pizzas" },
                    { image: slide3, label: "Soups" },
                    { image: slide4, label: "Desserts" },
                    { image: slide5, label: "Salads" },
                ].map((slide, index) => (
                    <SwiperSlide key={index} className="relative">
                        <img src={slide.image} alt={slide.label} className="w-full h-full object-cover" />
                        <h3 className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-4xl uppercase text-center text-white bg-black bg-opacity-50 px-4 py-2 rounded">
                            {slide.label}
                        </h3>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default CategorySlider;
