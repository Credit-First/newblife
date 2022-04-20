import * as React from 'react';

function teamSection() {
    return (
        <>
            <div id='team' className='team mb-32'>
                <div className='header w-full flex justify-center items-center mb-12' data-aos="zoom-out">
                    <div className='text-6xl text-white'>Team</div>
                </div>
                <div className='team-wrapper flex items-center justify-center mx-12 my-auto'>
                    <div className="team-card flex flex-col justify-center items-center pb-4 rounded-2xl w-[320px] mx-6 my-4 bg-main ease-linear hover:scale-105">
                        <img className='h-auto rounded-2xl border-4 border-main text-center text-lg m-0 bg-black' src="/images/team/artist.png" alt="Kory" />
                        <div className="member-card-body w-[96%] flex flex-col justify-center items-center grow rounded-2xl">
                            <div className="team-name font-bold m-0 leading-7 whitespace-nowrap text-ellipsis text-2xl text-black">Kory</div>
                            <div className="role- font-bold text-xl text-black">Artist</div>
                        </div>
                    </div>
                    <div className="team-card flex flex-col justify-center items-center pb-4 rounded-2xl w-[320px] mx-6 my-4 bg-main ease-linear hover:scale-105">
                        <img className='h-auto rounded-2xl border-4 border-main text-center text-lg m-0 bg-black' src="/images/team/developer.png" alt="Golfredo" />
                        <div className="member-card-body w-[96%] flex flex-col justify-center items-center grow rounded-2xl">
                            <div className="team-name font-bold m-0 leading-7 whitespace-nowrap text-ellipsis text-2xl text-black">Golfredo</div>
                            <div className="role- font-bold text-xl text-black">Developer</div>
                        </div>
                    </div>
                    <div className="team-card flex flex-col justify-center items-center pb-4 rounded-2xl w-[320px] mx-6 my-4 bg-main ease-linear hover:scale-105">
                        <img className='h-auto rounded-2xl border-4 border-main text-center text-lg m-0 bg-black' src="/images/team/community.png" alt="Tarek" />
                        <div className="member-card-body w-[96%] flex flex-col justify-center items-center grow rounded-2xl">
                            <div className="team-name font-bold m-0 leading-7 whitespace-nowrap text-ellipsis text-2xl text-black">Tarek</div>
                            <div className="role- font-bold text-xl text-black">Community</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default teamSection;