import * as React from 'react';

function AboutSection() {
    return (
        <>
            <div id='about' className='about flex items-center my-32 px-10 flex-col lg:flex-row'>
                <div id='aos-animation-1-1' className='description w-full lg:w-3/6 mx-8 mb-12 min-w-[370px] text-2xl' data-aos="fade-up" >
                    <p>
                        <strong className='bg-clip-text text-transparent bg-gradient-to-r from-main to-violet-500'>The Newblife </strong>
                        is a unique collection of
                        <strong className='bg-clip-text text-transparent bg-gradient-to-r from-main to-violet-500'> 5,555 </strong>
                        generative Non-Fungible Tokens with many different styles. Each artwork is original and the objective was to make each NewBlife unique in order to prioritize quality above quantity.
                        <strong className='bg-clip-text text-transparent bg-gradient-to-r from-main to-violet-500'> The Newblife </strong>
                        Ecosystem also features Animated, 2D and 3D NFT’s With more being added.
                    </p>
                </div>
                <div id='aos-animation-1-2' className='about-right relative w-max mx-12 max-w-[560px] text-xl rounded-[20px]' data-aos="fade-down" >
                    <video className='shadow-img min-w-[400px] min-h-[250px] rounded-[20px]' autoPlay muted loop src="videos/animation.mp4"></video>
                </div>
            </div>
        </>
    )
}
export default AboutSection;