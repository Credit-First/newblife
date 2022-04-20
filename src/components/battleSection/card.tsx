import * as React from 'react';
import Image from 'next/image';

interface props {
    id: number,
    src: string,
    health: number,
    attack: number,
    defence: number,
    selected: boolean
}
function Card({ id, src, health, attack, defence, selected }: props) {
    return (
        <div className={`rounded-lg border transition-all duration-200 ease-linear delay-100 m-2 ${!!selected ? 'border-pink-500 -translate-y-2 shadow-lg shadow-main' : 'border-white'}`}>
            <div className='relative w-[120px] h-[150px]'>
                <Image src={`/images/cards/${src}`} layout='fill' objectFit='fill' />
            </div>
            <div className='flex flex-col p-2'>
                <div className='flex justify-start'>
                    <div className='mr-2'>Health:</div>
                    {health}
                </div>
                <div className='flex'>
                    <div className='mr-2'>Attack:</div>
                    {attack}
                </div>
                <div className='flex'>
                    <div className='mr-2'>Defence:</div>
                    {defence}
                </div>
            </div>
        </div>
    )
}

export default Card;