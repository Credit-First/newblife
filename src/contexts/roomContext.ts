import React from 'react';

const RoomContext = React.createContext({
  contract: null,
  totalSupply: null,
  roomList: [],
  isLoading: true,
  currentRoom: {
    id: null,
    topAddress: null,
    bottomAddress: null,
    topCardList: [],
    bottomCardList: [],
    state: null,
    detail: null,
    turnMode: null
  },
  loadContract: (web3: any, contract: any) => { },
  loadTotalSupply: (contract: any) => { },
  loadRoomList: (contract: any, totalSupply: any) => { },
  loadRoomDetail: (id: any) => { },
  updateRoomDetail: (room: any) => { },
  setIsLoading: () => { },
  addRoom: (room: any) => { },
  joinRoom: (room: any) => { },
});

export default RoomContext;