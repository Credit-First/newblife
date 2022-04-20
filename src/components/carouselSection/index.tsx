import * as React from 'react';
import Image from 'next/image';
import AOS from "aos";
import "aos/dist/aos.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { Autoplay, EffectCards } from "swiper";

function CarouselSection() {
    React.useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);
    return (
        <>
            <div id='carousel' className='carousel mb-32'>
                <div className='header w-full flex justify-center items-center' data-aos="zoom-out">
                    <div className='text-6xl text-white mb-6'>Newblifes</div>
                </div>
                <Swiper
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    effect={"cards"}
                    grabCursor={true}
                    modules={[Autoplay, EffectCards]}
                    className="nft-swiper"
                >
                    <SwiperSlide><div className='p-4 w-full h-full'><Image className='rounded-2xl shadow-img w-full h-full' src='/images/slides/1.png' layout='fill' objectFit='fill' /></div></SwiperSlide>
                    <SwiperSlide><div className='p-4 w-full h-full'><Image className='rounded-2xl shadow-img w-full h-full' src='/images/slides/2.png' layout='fill' objectFit='fill' /></div></SwiperSlide>
                    <SwiperSlide><div className='p-4 w-full h-full'><Image className='rounded-2xl shadow-img w-full h-full' src='/images/slides/3.png' layout='fill' objectFit='fill' /></div></SwiperSlide>
                    <SwiperSlide><div className='p-4 w-full h-full'><Image className='rounded-2xl shadow-img w-full h-full' src='/images/slides/4.png' layout='fill' objectFit='fill' /></div></SwiperSlide>
                    <SwiperSlide><div className='p-4 w-full h-full'><Image className='rounded-2xl shadow-img w-full h-full' src='/images/slides/5.png' layout='fill' objectFit='fill' /></div></SwiperSlide>
                    <SwiperSlide><div className='p-4 w-full h-full'><Image className='rounded-2xl shadow-img w-full h-full' src='/images/slides/6.png' layout='fill' objectFit='fill' /></div></SwiperSlide>
                    <SwiperSlide><div className='p-4 w-full h-full'><Image className='rounded-2xl shadow-img w-full h-full' src='/images/slides/7.png' layout='fill' objectFit='fill' /></div></SwiperSlide>
                    <SwiperSlide><div className='p-4 w-full h-full'><Image className='rounded-2xl shadow-img w-full h-full' src='/images/slides/8.png' layout='fill' objectFit='fill' /></div></SwiperSlide>
                    <SwiperSlide><div className='p-4 w-full h-full'><Image className='rounded-2xl shadow-img w-full h-full' src='/images/slides/9.png' layout='fill' objectFit='fill' /></div></SwiperSlide>
                </Swiper>
            </div>
        </>
    )
}
export default CarouselSection;