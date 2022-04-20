import { useReducer } from 'react';

import RoomContext from '@/contexts/roomContext';
import { roomList } from '@/config/temp';

const defaultRoomState = {
    contract: null,
    totalSupply: null,
    roomList: [],
    currentRoom: null,
    isLoading: true
};

let _roomList = roomList;

const roomReducer = (state: any, action: any) => {
    if (action.type === 'CONTRACT') {
        return {
            ...state,
            contract: action.contract,
        };
    }

    if (action.type === 'LOADSUPPLY') {
        return {
            ...state,
            totalSupply: action.totalSupply
        };
    }

    if (action.type === 'LOADROOMLIST') {
        return {
            ...state,
            roomList: action.roomList
        };
    }

    if (action.type === 'LOADCURRENTROOM') {
        return {
            ...state,
            currentRoom: action.room
        };
    }

    if (action.type === 'LOADCURRENTROOM') {
        return {
            ...state,
            currentRoom: action.room
        };
    }
    if (action.type === 'LOADUPDATEROOM') {
        return {
            ...state,
            currentRoom: action.room
        };
    }
    
    if (action.type === 'LOADING') {
        return {
            ...state,
            isLoading: action.loading
        };
    }

    if (action.type === 'ADDROOM') {
        _roomList = action.roomList;
        return {
            ...state,
            roomList: action.roomList
        };
    }

    if (action.type === 'JOINROOM') {
        return {
            ...state,
            roomList: action.roomList
        };
    }

    return defaultRoomState;
};

const RoomProvider = (props: { children: any; }) => {
    const [RoomState, dispatchRoomAction] = useReducer(roomReducer, defaultRoomState);

    const loadContractHandler = (web3: any, contract: any) => {
        const _contract = new web3.eth.Contract(contract.abi, contract.address);
        dispatchRoomAction({ type: 'CONTRACT', contract: _contract });
        return _contract;
    };

    const loadTotalSupplyHandler = async (contract: any) => {
        const totalSupply = roomList.length;
        dispatchRoomAction({ type: 'LOADSUPPLY', totalSupply: totalSupply });
        return totalSupply;
    };

    const loadRoomListHandler = async (contract: any, totalSupply: any) => {
        let room: any[] = [];
        dispatchRoomAction({ type: 'LOADROOMLIST', roomList: _roomList });
    };

    const loadRoomDetailHandler = async (id:any) => {
        const room = RoomState.roomList.find((item:any) => {
            return item.id == id
        });
        dispatchRoomAction({ type: 'LOADCURRENTROOM', room: room });
    };

    const updateRoomDetailHandler = async (room:any) => {
        const _room = RoomState.roomList.find((item:any) => {
            if(item.id == room.id) {
                item.turnMode = room.turnMode;
                item.topCardList = room.topCardList;
                item.bottomCardList = room.bottomCardList;
            }
            return item
        });
        dispatchRoomAction({ type: 'LOADUPDATEROOM', room: _room });
    };

    const setisLoadingHandler = (loading: any) => {
        dispatchRoomAction({ type: 'LOADING', loading: loading });
    };

    const addRoomHandler = (room: any) => {
        let _room = {
            id: room.id,
            topAddress: room.topAddress,
            bottomAddress: '',
            topCardList: room.topCardList,
            bottomCardList: '',
            state: false,
            turnMode: room.topAddress,
            detail: room.detail
        }
        const newList = [_room, ...RoomState.roomList];
        
        dispatchRoomAction({ type: 'ADDROOM', roomList: newList });
    };

    const joinRoomHandler = (room: any) => {
        const newList = RoomState.roomList.map((item:any) => {
            if(item.id === room.id) {
                item.bottomAddress = room.bottomAddress;
                item.bottomCardList = room.bottomCardList;
                item.state = true;
                item.detail = room.detail;
            }
            return item;
        });

        dispatchRoomAction({ type: 'JOINROOM', roomList: newList });
    };

    const roomContext = {
        contract: RoomState.contract,
        totalSupply: RoomState.totalSupply,
        roomList: RoomState.roomList,
        isLoading: RoomState.isLoading,
        currentRoom: RoomState.currentRoom,
        loadContract: loadContractHandler,
        loadTotalSupply: loadTotalSupplyHandler,
        loadRoomList: loadRoomListHandler,
        loadRoomDetail: loadRoomDetailHandler,
        updateRoomDetail: updateRoomDetailHandler,
        setisLoading: setisLoadingHandler,
        addRoom: addRoomHandler,
        joinRoom: joinRoomHandler,
    };

    return (
        <RoomContext.Provider value={roomContext}>
            {props.children}
        </RoomContext.Provider>
    );
};

export default RoomProvider;