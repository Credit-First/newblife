import * as React from 'react';

interface props {
    id: number,
    topAddress: string,
    bottomAddress: string,
    detail: string
}
function Room({ id, topAddress, bottomAddress, detail }: props) {

    return (
        <div className='flex flex-col items-start justify-start p-6 rounded-lg border-2 border-white cursor-pointer h-[250px]'>
            <div className='flex'>
                <div className='mr-2'>roomId:</div>
                <div>{id}</div>
            </div>
            <div className='flex items-center justify-center w-full py-6'>
                <div className='text-2xl mr-4'>Vs</div>
                <div className=''>
                    <div>
                        {topAddress.substring(0, 8)} ... {topAddress.substring(topAddress.length - 4)}
                    </div>
                    <div>
                        {bottomAddress.substring(0, 8)} ... {bottomAddress.substring(bottomAddress.length - 4)}
                    </div>
                </div>
            </div>
            <div className='flex'>
                <div className='mr-2'>detail:</div>
                <div className='flex flex-col'>
                    <div>{detail}...</div>
                </div>
            </div>
        </div>
    )
}
export default Room;