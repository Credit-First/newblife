import * as React from 'react'
import { Dialog, Transition } from '@headlessui/react';
import toast from "@/components/toast";
import "react-toastify/dist/ReactToastify.css";
import { sleep } from '@/hooks/useSleep';
import Card from './card';

import Config from '@/config/app';
import { useWeb3React } from "@web3-react/core";
import RoomContext from '@/contexts/roomContext';
import { useRouter } from 'next/router';

import { nftCards } from '@/config/temp';

interface modalProps {
    open: boolean,
    setOpen: any,
    roomId: any
}

export default function JoinRoomModal({ open, setOpen, roomId }: modalProps) {
    const router = useRouter();
    const { account }: any = useWeb3React();
    const roomCtx = React.useContext(RoomContext);
    const cancelButtonRef = React.useRef(null);
    const [loading, setLoading] = React.useState(false);
    const [cardList, setCardList] = React.useState<any[]>([]);
    const [selecetedCardList, setSelectedCardList] = React.useState<any[]>([]);

    const notify = React.useCallback((type, message) => {
        toast({ type, message });
    }, []);

    const selectCard = (id: number) => () => {
        const selectedCardIds: React.SetStateAction<any[]> = [];

        const newList = cardList.map((item: any) => {
            if (item.id == id) {
                let selected = item.selected;
                if (!selected) {
                    if (selecetedCardList.length < Config.limitCards) {
                        item.selected = true;
                    }
                } else {
                    item.selected = false
                }
            }
            if (item.selected) {
                selectedCardIds.push({ ...item, selected: false });
            }
            return item;
        })
        if (selectedCardIds.length - 1 < Config.limitCards) {
            setSelectedCardList(selectedCardIds);
            setCardList(newList);
        }
    }
    const JoinRoom = async () => {
        console.log('Join Room')
        if (!account) return notify('error', 'please connect your wallet');
        if (selecetedCardList.length == 0) return notify('error', 'please select nft cards')

        // write function to the contract
        //contract.write(roomId, selectedCardList)

        roomCtx.joinRoom({
            id: roomId,
            bottomAddress: account,
            bottomCardList: selecetedCardList,
            detail: 'starting battle'
        });

        setOpen(false);
        setSelectedCardList([]);
        setCardList(nftCards);
        notify('success', 'Joind room')

        router.push({
            pathname: '/battle',
            query: { roomId: roomId },
        })
    }

    React.useEffect(() => {
        if (open) {
            setCardList(nftCards.map((item: any) => {
                item.selected = false;
                return item;
            }));
        }
        else {
            setSelectedCardList([]);
        }
    }, [open]);

    return (
        <Transition.Root show={open} as={React.Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="relative inline-block align-bottom bg-black rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-5xl sm:w-full">
                            <div className="bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="flex justify-center items-center">
                                    <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <div className="text-3xl font-medium text-white">
                                            Join Room
                                        </div>
                                        <div className='mt-6 flex'>
                                            <div className="w-3/4 flex flex-wrap justify-start overflow-y-auto max-h-[500px]">
                                                {
                                                    cardList.map((item: any) => {
                                                        return (
                                                            <div key={item.src} onClick={selectCard(item.id)} >
                                                                <Card {...item} />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className='w-1/4 border-pink-500 border-l-2 pl-4 ml-4'>
                                                <div className='flex justify-between text-white'>
                                                    <div className=''>
                                                        selected Cards:
                                                    </div>
                                                    <div>
                                                        {selecetedCardList.length}/5
                                                    </div>
                                                </div>
                                                <div className='overflow-y-auto max-h-[500px]'>
                                                    {
                                                        selecetedCardList.map((item: any, key: number) => (
                                                            <div key={key} className='flex border border-pink-500 rounded-lg text-white p-2 my-2'>
                                                                {key + 1}
                                                                {key == 0 ? 'st' : 'th'}
                                                                <div className='mx-2'>card number: </div>
                                                                {item.id}
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-center bg-black px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button" onClick={JoinRoom}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-6 py-4 bg-pink-500 text-base font-medium text-white hover:bg-pink-700  sm:w-auto sm:text-sm"
                                >
                                    Join Room
                                </button>
                                {/* <button
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-md bg-pink-500 shadow-sm px-4 py-2 text-base font-medium text-white hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={() => setOpen(false)}
                                ref={cancelButtonRef}
                                >
                                Cancel
                                </button> */}
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
function list(list: any) {
    throw new Error('Function not implemented.');
}

