import * as React from 'react';

function CommunitySection() {
    return (
        <>
            <div id='community' className='community mb-32 bg-gradient-to-r from-pink-900 to-main'>
                <div className='community-container relative p-16 mx-0 my-auto w-full'>
                    <div className="title mb-[25px] font-bold text-5xl color-white" data-aos="fade-down">Join the Community</div>
                    <p className='w-4/6 text-lg'>Check out our Discord, Twitter  and Telegram platforms We have an amazing community full of interactive and creative people, it is based on mutual respect and understanding between the members, all types of offensive content or actions are forbidden. We support friendship, creativity and Aesthetic ideas.</p>
                    <div className="meka w-[440px] h-[370px] absolute bg-[url('/images/viking.png')] right-0 bg-no-repeat bg-center bg-contain bottom-0" data-aos="fade-up" data-aos-duration="2000" data-aos-offset="420"></div>
                </div>
            </div>
        </>
    )
}
export default CommunitySection;