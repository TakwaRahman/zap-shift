
import Review from './Reveiw';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { use } from 'react';

const Reviews = ({ reveiwsData }) => {
    const reveiew = use(reveiwsData)

    return (
        <div>
            <div className="text-center mt-16 lg:mt-20 px-4 space-y-4">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                    What Our Customers Are Saying
                </h3>

                <p className="max-w-2xl lg:max-w-3xl mx-auto text-gray-500 text-sm sm:text-base leading-7">
                    Enhance posture, mobility, and overall well-being effortlessly with
                    Posture Pro. Improve your body alignment, reduce discomfort, and build
                    healthier posture habits with ease.
                </p>
            </div>

            <Swiper
                loop={true}
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'3'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    // Mobile
                    0: {
                        slidesPerView: 1,
                    },

                    // Tablet
                    768: {
                        slidesPerView: 2,
                    },

                    // Laptop/Desktop
                    1024: {
                        slidesPerView: 3,
                    },
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="mySwiper mt-10"
            >
                {
                    reveiew.map(reveiew => {
                        return (
                            <SwiperSlide>
                                <Review reveiew={reveiew}></Review>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>

        </div>

    );
};

export default Reviews;