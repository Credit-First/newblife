import * as React from 'react';
import dynamic from 'next/dynamic';
import toast from "@/components/toast";
import "react-toastify/dist/ReactToastify.css";

import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";

const ConnectWallet = dynamic(() => import('@/components/connectWallet'));

function CreateSection() {
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const [loading, setLoading] = React.useState(false);
    const {account}: any = useWeb3React();
    const notify = React.useCallback((type, message) => {
        toast({ type, message });
    }, []);

    const handleCreate = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            videoRef.current && videoRef.current.play();
            notify('success', 'Success mint the nft');
        }, 5000);
    }

    return (
        <>
            <div id='create' className='create flex w-full items-center my-32 px-10 flex-col'>
                <div className='border-2 border-main rounded-[50px] p-24 w-full flex flex-col items-center justify-center'>
                    <div className='title m-8 text-yellow-400 text-2xl font-bold'>GET YOUR UNIQUE COOTIE NOW!</div>
                    <div className='content text-center'>
                        <p>
                            Every cootie minted is randomly chosen from a collection of 4444 NFTs.
                        </p>
                        <p>
                            Each 200th sales, the floor price rises 20%
                        </p>
                    </div>
                    <div className='remain-nft-count m-8 w-full flex items-center justify-center text-3xl font-bold'>
                        <div>2926</div>
                        <div>Cootie Left</div>
                    </div>
                    <div className='image-wrapper rounded-[50px] p-4 flex items-center justify-center'>
                        <video className='shadow-md shadow-img min-w-[400px] min-h-[250px] rounded-[20px]' ref={videoRef} loop={false} src="videos/animation2.mp4"></video>
                    </div>
                    {
                        account ? (
                            <>
                                {
                                    !loading ? (
                                        <div className='create-nft flex items-center justify-center bg-pink-600 hover:bg-pink-400 mt-8 py-2 px-4 flex text-sm rounded-3xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white cursor-pointer hover:scale-105' onClick={handleCreate}>
                                            <div className='img w-8 h-8'>
                                                <img src='/images/networks/songbird.png' />
                                            </div>
                                            <div className='flex items-center justify-center text-xl'>
                                                <div>BUY</div>
                                                <div className='mx-2'>1074.5</div>
                                                <div className='text-sm'>SGB</div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='loading mt-8 flex flex-col items-center justify-center'>
                                            <div className="border-t-transparent w-14 h-14 border-4 border-main border-dashed rounded-full animate-spin"></div>
                                            <div className='text-white text-md mt-4'>
                                                Waiting for MetaMask Confirmation..
                                            </div>
                                        </div>
                                    )
                                }
                            </>
                        ) : (
                            <div className='create-nft flex items-center justify-center bg-pink-600 hover:bg-pink-400 mt-8 py-2 px-4 flex text-sm rounded-3xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white cursor-pointer hover:scale-105'>
                                <div className='flex items-center justify-center text-xl'>
                                    <ConnectWallet />
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}
export default CreateSection;