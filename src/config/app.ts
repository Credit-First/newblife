import abi from "./abi";

export default {
    netId: 97,
    updateTime: 35000,
    InfuraId: 'b596546b8ae94aa883f9830c1fw90767f',
    site_name: 'Card game',
    title: 'Card game',
    description: '',
    locale: 'en',
    limitCards: 5,
    network: process.env.NEXT_PUBLIC_NETWORK,
    test_network: process.env.NEXT_PUBLIC_TEST_NETWORK,
    rpc_url: process.env.NEXT_PUBLIC_RPC_URL,
    test_rpc_url: process.env.NEXT_PUBLIC_TEST_RPC_URL,
    backend_url: process.env.NEXT_PUBLIC_BACKEND_URL,
    room: {
        address: '0x094616F0BdFB0b526bD735Bf66Eca0Ad254ca81F',
        abi: abi.ROOM
    }
}
