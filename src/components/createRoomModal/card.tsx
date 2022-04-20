import * as React from 'react';
import Image from 'next/image';

interface props {
    id: number,
    src: string,
    selected: boolean
}
function Card({id, src, selected}: props) {
    return (
        <div className={`relative rounded-lg border  w-[150px] h-[200px] m-2 ${ selected ? 'border-pink-500' : 'border-white'}`}>
            <div className={`absolute top-0 left-1 ${ selected ? 'text-pink-500' : 'text-white'}`}>{id}</div>
            <Image src={`/images/cards/${src}`} layout='fill' objectFit='fill'/>
        </div>
    )
}

export default Card;