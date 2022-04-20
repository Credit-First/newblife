import * as React from 'react';

function PoweredBySection() {
    return (
        <>
            <div id='poweredBy' className='poweredBy mb-32'>
                <div className='header w-full flex justify-center items-center' data-aos="zoom-out">
                    <div className='text-6xl text-white'>Powered By</div>
                </div>
                <div className='poweredBy-container mx-0 my-auto w-full py-6'>
                    <div className='row partner-row flex justify-center'>
                        <div className="partner-box avax flex justify-center items-center w-[17%] rounded-lg border border-main p-12 max-h-[150px] mx-8 my-12 text-center shadow-network">
                            <img className='max-w-[100px]' src="/images/networks/avax-logo.png" alt="" />
                        </div>
                        <div className="partner-box avax flex justify-center items-center w-[17%] rounded-lg border border-main p-12 max-h-[150px] mx-8 my-12 text-center shadow-network">
                            <img className='max-w-[200px]' src="/images/networks/Binance-logo.png" alt="" />
                        </div>
                        <div className="partner-box avax flex justify-center items-center w-[17%] rounded-lg border border-main p-12 max-h-[150px] mx-8 my-12 text-center shadow-network">
                            <img className='max-w-[200px]' src="/images/networks/songbird-logo.png" alt="" />
                        </div>
                        <div className="partner-box avax flex justify-center items-center w-[17%] rounded-lg border border-main p-12 max-h-[150px] mx-8 my-12 text-center shadow-network">
                            <img className='max-w-[100px]' src="/images/networks/polygon-logo.png" alt="" />
                        </div>                    
                    </div>
                </div>
            </div>
        </>
    )
}
export default PoweredBySection;