import * as React from 'react';

function AirdropSection() {
    return (
        <>
            <div id='airdrop' className='airdrop flex items-center my-32 px-10 flex-col'>
                <div className='airdrop-title m-12 text-3xl text-white font-bold'>
                    Be part of Cootie Token Airdrop
                </div>
                <div className='action'>
                    <button className='p-4 bg-main rounded-2xl text-2xl w-[200px]'>Subcribe</button>
                </div>
            </div>
        </>
    )
}
export default AirdropSection;