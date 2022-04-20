import * as React from 'react';
import Router, { useRouter } from 'next/router';
import toast from "@/components/toast";
import "react-toastify/dist/ReactToastify.css";
import ButtonAction from './buttonAction';
import Card from './card';
import Config from '@/config/app';
import Web3 from "web3";
import { useWeb3React } from '@web3-react/core';
import roomContext from '@/contexts/roomContext';

function Battle() {
    const roomCtx = React.useContext(roomContext);
    const router = useRouter();
    const { account }: any = useWeb3React();
    const { roomId }: any = router.query;
    const [active, setActive] = React.useState(false);
    const [attackFair, setAttackFair] = React.useState({
        top: 0,
        topHealth: '',
        bottom: 0,
        bottomHealth: ''
    });
    const [currentCardState, setCurrentCardState] = React.useState({
        top: '',
        bottom: '',
    })
    const [topCardList, setTopCardList] = React.useState<any[]>([]);
    const [topAddress, setTopAddress] = React.useState(null);
    const [bottomAddress, setBottomAddress] = React.useState(null);
    const [bottomCardList, setBottomCardList] = React.useState<any[]>([]);
    const [turnMode, setTurnMode] = React.useState(null);
    const [battleState, setBattleState] = React.useState(null);

    const notify = React.useCallback((type, message) => {
        toast({ type, message });
    }, []);

    const handleTopCardSelect = (id: number) => () => {
        setAttackFair({ ...attackFair, top: 0 });
        const newList = topCardList.map((item: any) => {
            let selected = item?.selected || false;
            item.selected = false;
            if (item.id == id) {
                item.selected = !selected;
            }
            if (item.selected) {
                setAttackFair({ ...attackFair, top: id });
            }
            return item
        })
        setTopCardList(newList);
    }

    const handleBottomCardSelect = (id: number) => () => {
        setAttackFair({ ...attackFair, bottom: 0 });
        const newList = bottomCardList.map((item: any) => {
            let selected = item?.selected || false;
            item.selected = false;
            if (item.id == id) {
                item.selected = !selected;
            }
            if (item.selected) {
                setAttackFair({ ...attackFair, bottom: id });
            }
            return item
        })
        setBottomCardList(newList);
    }

    const handleAttack = () => {
        if (attackFair.top == 0 || attackFair.bottom == 0) return notify('error', 'please choose card');

        //read result from the contract
        let lostTopHealth = 20;
        let newTopCardList = topCardList.filter((item: any) => {
            if (item.id === attackFair.top) {
                item.health -= lostTopHealth;
            }
            item.selected = false;
            if (item.health > 0) return item;
        });
        setTopCardList(newTopCardList);

        let lostBottomHealth = 30;
        let newBottomCardList = bottomCardList.filter((item: any) => {
            if (item.id === attackFair.bottom) {
                item.health -= lostBottomHealth;
            }
            item.selected = false;
            if (item.health > 0) return item;
        });
        setBottomCardList(newBottomCardList);

        const newState = { top: `-${lostTopHealth}`, bottom: `-${lostBottomHealth}` };
        setCurrentCardState(newState);

        if(newTopCardList.length == 0 || newBottomCardList.length == 0) {
            if(newTopCardList.length > 0 && account == topAddress) {
                notify('success', 'you win')
            }else if(newBottomCardList.length > 0 && account == bottomAddress) {
                notify('success', 'you win')
            } else {
                notify('error', 'you lost')
            }
        }

        setTurnMode((turnMode === topAddress) ? bottomAddress : topAddress);

        roomCtx.updateRoomDetail({
            id: roomId,
            topCardList: newTopCardList,
            bottomCardList: newBottomCardList,
            turnMode: (turnMode === topAddress) ? bottomAddress : topAddress,
        })

        loadBattle();
    }

    const handleExist = () => {
        notify('error', 'You cancel the battle');
        router.push('/room')
    }

    const loadBattle = async () => {
        const web3 = new Web3(Web3.givenProvider);
        const contract: any = roomCtx.loadContract(web3, Config.room);
        // if (contract) {
        roomCtx.loadRoomDetail(roomId);

        // battleCtx.events.startBattle()
        //   .on('data', (event) => {
        //     battleCtx.loadBattleDetail(event.returnValues.roomId);
        //   })
        //   .on('error', (error) => {
        //     console.log(error);
        //   });
        // }
    }

    React.useEffect(() => {
        loadBattle();
    }, []);

    React.useEffect(() => {
        if (roomCtx.currentRoom) {
            console.log(roomCtx.currentRoom.turnMode)
            setTopCardList(roomCtx.currentRoom.topCardList);
            setBottomCardList(roomCtx.currentRoom.bottomCardList);
            setTopAddress(roomCtx.currentRoom.topAddress);
            setBottomAddress(roomCtx.currentRoom.bottomAddress);
            setBattleState(roomCtx.currentRoom.state);
            setTurnMode(roomCtx.currentRoom.turnMode);
            setActive(account === roomCtx.currentRoom.turnMode);
        }
    }, [roomCtx, account]);

    return (
        <>
            <div id='room' className='room flex items-center my-8 flex-col lg:flex-column h-full'>
                <div className='text-3xl'>Battle Field</div>
                <div className='battle-ground flex w-full'>
                    <div className='battle-field flex flex-col flex-1 p-4'>
                        <div className='top-area flex justify-start'>
                            {
                                topCardList && topCardList.length > 0 && topCardList.map((item: any, key: number) => {
                                    return (
                                        <div key={key} className='' onClick={handleTopCardSelect(item.id)}>
                                            <Card {...item} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className=''>
                            {
                                account == topAddress && (
                                    <div>yours</div>
                                )
                            }
                        </div>
                        <div className='battle-area flex-1 flex w-full justify-center items-center my-6'>
                            {
                                currentCardState.top !== '' && (
                                    <>
                                        <div className='flex justify-end'>
                                            <div className='mr-2'>health:</div>
                                            <div>{currentCardState.top}</div>
                                        </div>
                                        <div className='mx-4 text-3xl'>VS</div>
                                        <div className='flex justify-start'>
                                            <div className='mr-2'>health:</div>
                                            <div>{currentCardState.bottom}</div>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                        <div className=''>
                            {
                                account == bottomAddress && (
                                    <div>yours</div>
                                )
                            }
                        </div>
                        <div className='bottom-area flex justify-end'>
                            {
                                bottomCardList && bottomCardList.length > 0 && bottomCardList.map((item: any, key: number) => {

                                    return (
                                        <div key={key} className='' onClick={handleBottomCardSelect(item.id)}>
                                            <Card {...item} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='battle-action flex flex-col border-l border-pink-600 p-12 min-w-[200px]'>
                        <ButtonAction attack={handleAttack} active={active} battleState={battleState} onExist={handleExist} />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Battle;