import * as React from 'react';
import dynamic from 'next/dynamic';
const AirDropSection = dynamic(() => import('@/components/mintSection/airdrop'));
const CreateSection = dynamic(() => import('@/components/mintSection/create'));

function MintSection() {
    return (
        <>
            <div id='mint' className='mint flex items-center my-32 px-10 flex-col'>
                <AirDropSection />
                <CreateSection />
            </div>
        </>
    )
}
export default MintSection;