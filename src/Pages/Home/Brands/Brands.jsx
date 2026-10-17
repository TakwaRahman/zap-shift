// import Swiper JS

// import Swiper styles

import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import amazon from '../../../assets/brands/amazon.png';
import amazon_vector from '../../../assets/brands/amazon_vector.png';
import casio from '../../../assets/brands/casio.png';
import moonstar from '../../../assets/brands/moonstar.png';
import randstad from '../../../assets/brands/randstad.png';
import star from '../../../assets/brands/star.png';
import start_people from '../../../assets/brands/start_people.png';


const brandLogs = [amazon, amazon_vector, casio, moonstar, randstad, star, start_people]

const Brands = () => {
    return (
        <div className='mt-20'>
            <Swiper slidesPerView={3}
                spaceBetween={30}
                loop={true}
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                }}
                
                modules={[Autoplay]}
                className="mySwiper">

                {
                    brandLogs.map((logo, index) => {
                        return (
                            <SwiperSlide key={index}><img src={logo} alt="" /></SwiperSlide>
                        )
                    })
                }


            </Swiper>
        </div>
    );
};

export default Brands;