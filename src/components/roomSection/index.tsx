import * as React from 'react';
import Room from './room';
import CreateRoomModal from '../createRoomModal';
import JoinRoomModal from '../joinRoomModal';

import Config from '@/config/app';
import Web3 from "web3";
import RoomContext from '@/contexts/roomContext';
import { useRouter } from 'next/router';

function RoomSection() {
    const router = useRouter();
    const roomCtx = React.useContext(RoomContext);
    const [createRoomModal, setCreateRoomModal] = React.useState(false);
    const [joinRoomModal, setJoinRoomModal] = React.useState(false);
    const [roomId, setRoomId] = React.useState(0);
    const [roomList, setRoomList] = React.useState([]);
    const handleJoinToRoom = (roomId: number) => () => {
        console.log('join into room');
        setRoomId(roomId);
        setJoinRoomModal(true);
    }

    const loadContract = () => {

        const web3 = new Web3(Web3.givenProvider);
        const contract: any = roomCtx.loadContract(web3, Config.room);
        if (contract) {
            // Load total Supply
            const totalSupply = roomCtx.loadTotalSupply(contract);

            // Load roomList
            roomCtx.loadRoomList(contract, totalSupply);

            // Event subscription
            // contract.events.createRoom()
            //   .on('data', (event) => {
            //     collectionCtx.updateRoom(contract, event.returnValues.tokenId, event.returnValues.to);
            //     collectionCtx.isLoading(false);
            //   })
            //   .on('error', (error) => {
            //     console.log(error);
            //   });

        } else {
            window.alert('room contract not deployed to detected network.')
        }
    }

    React.useEffect(() => {
        loadContract();
    }, []);

    React.useEffect(() => {
        setRoomList(roomCtx.roomList)
    },[roomCtx.roomList]);

    return (
        <>
            <div id='room' className='room flex items-center my-8 flex-col lg:flex-column'>
                <div className='header w-full flex justify-center items-center mb-14 aos-animate' data-aos="fade-up">
                    <div className='text-6xl text-white'>Room</div>
                </div>
                <div className='rounded-2xl bg-pink-600 hover:bg-pink-400 p-4 my-2 text-xl' onClick={() => setCreateRoomModal(true)}>
                    <button>Create Battle</button>
                </div>
                <div className='flex items-center justify-start flex-wrap w-screen px-12'>
                    {
                        roomList.map((item: any, key: number) => {
                            return (
                                <div key={key} className='p-2 w-full sm:w-2/4 md:w-1/3 lg:w-1/4'  onClick={handleJoinToRoom(item.id)}>
                                    <Room {...item} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <CreateRoomModal open={createRoomModal} setOpen={setCreateRoomModal} />
            <JoinRoomModal open={joinRoomModal} setOpen={setJoinRoomModal} roomId={roomId} />
        </>
    )
}
export default RoomSection;