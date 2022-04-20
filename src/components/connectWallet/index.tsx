import * as React from 'react';
import { Dialog, Transition } from '@headlessui/react'
import toast from "@/components/toast";
import "react-toastify/dist/ReactToastify.css";

import Config from '@/config/app';
import { Wallets, ConnectedWallet } from '@/config/assets/constants/wallets';
import { walletconnect } from "@/config/assets/constants/connectors";
import { useEagerConnect } from '@/hooks/useEagerConnect';
import { useInactiveListener } from '@/hooks/useInactiveListener';
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from "@web3-react/frame-connector";
import { URI_AVAILABLE, UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from "@web3-react/walletconnect-connector";

import { NoEthereumProviderError, UserRejectedRequestError as UserRejectedRequestErrorInjected } from "@web3-react/injected-connector";
import Web3 from "web3";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import clsx from 'clsx';

declare const window: Window &
    typeof globalThis & {
        ethereum: any
    }

export default function Example() {
    const [open, setOpen] = React.useState(false);
    const cancelButtonRef = React.useRef(null);
    const [alertClose, setAlertClose] = React.useState(true);
    const triedEager = useEagerConnect();
    const [activatingConnector, setActivatingConnector] = React.useState(undefined);
    const [isSelectingWallet, setIsSelectingWallet] = React.useState(true);
    const { activate, active, account, deactivate, connector, error, setError, library, chainId }: any = useWeb3React();
    const cWallet = ConnectedWallet();

    const notify = React.useCallback((type, message) => {
        toast({ type, message });
    }, []);

    // ** Effects
    React.useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined);
        }
    }, [activatingConnector, connector]);
    // log the walletconnect URI
    React.useEffect(() => {
        const logURI = (uri: any) => {
            console.log("WalletConnect URI", uri);
        };
        walletconnect.on(URI_AVAILABLE, logURI);

        return () => {
            walletconnect.off(URI_AVAILABLE, logURI);
        };
    }, []);

    useInactiveListener(!triedEager);

    const onConnectWallet = (item: any) => async () => {
        setActivatingConnector(item.connector);
        setIsSelectingWallet(false);
        sessionStorage.close = false;
        await activate(item.connector);
    };

    const onDeactiveWallet = () => {
        setIsSelectingWallet(true);
        sessionStorage.close = "true";
        deactivate();
        setOpen(false);
    };

    const retryConnect = async () => {
        const activating = Wallets.find(item => (item.connector === activatingConnector || item.connector === connector));
        if (window.ethereum) {
            await window.ethereum
                .request({
                    method: "wallet_addEthereumChain",
                    params: [
                        {
                            chainId: `0x${Config.netId.toString(16)}`,
                            chainName: "Binance Smart Chain Testnet",
                            rpcUrls: [
                                Config.test_rpc_url
                            ],
                            nativeCurrency: {
                                name: "WBNB",
                                symbol: "WBNB",
                                decimals: 18,
                            },
                            blockExplorerUrls: [
                                Config.test_network
                            ],
                        },
                    ],
                })
                .then(() => {
                    notify("success", "You have successfully changed to Binance Smart Main Network.");
                })
                .catch((error: any) => {
                    notify("error", error.toString());
                });
        } else {
            notify('error', '')
        }
        onConnectWallet(activating);
        setError(null);
    };

    const changeWallet = (error: any) => {
        if (!error) {
            return true;
        } else {
            setError(null);
            setIsSelectingWallet(true);
        }
    }

    const getErrorMessage = (error: any) => {
        if (error instanceof NoEthereumProviderError) {
            return "Install MetaMask on desktop or visit from a dApp browser on mobile.";
        } else if (error instanceof UnsupportedChainIdError) {
            return "You're connected to an unsupported network.";
        } else if (
            error instanceof UserRejectedRequestErrorInjected ||
            error instanceof UserRejectedRequestErrorWalletConnect ||
            error instanceof UserRejectedRequestErrorFrame
        ) {
            return "Please authorize this website to access your account.";
        } else {
            console.error(error);
            return "An unknown error occurred. Check the console for more details.";
        }
    };

    React.useEffect(() => {
        console.log('wallet', active);
        if (active) {
        } else {
            setIsSelectingWallet(true);
        }
        if(error) setAlertClose(false);
    }, [account, active, error])

    return (
        <>
            <button onClick={() => setOpen(true)}>
                {
                    active ? (
                        <div>
                            {account.substring(0, 8)} ... ${account.substring(account.length - 4)}
                        </div>
                    ) : (
                        <div>CONNECT</div>
                    )
                }
            </button>
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
                            <div className="relative bg-black inline-block backdrop-blur-sm align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full">
                                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="w-full mt-3 text-center">
                                            <Dialog.Title as="h3" className="mb-6 text-xl text-center leading-6 font-bold text-white">
                                                Connect Wallet
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                {
                                                    (error || chainId == undefined) ? (
                                                        <div id="alert-error" className={clsx('m-2 p-4 mb-4 bg-red-100 rounded-lg dark:bg-red-200', alertClose ? 'hidden' : '')} role="alert">
                                                            <div className="mt-2 mb-4 text-sm text-red-700 dark:text-red-800">
                                                                {getErrorMessage(error)}
                                                            </div>
                                                            <div className="flex items-center justify-center">
                                                                <button type="button" onClick={() => retryConnect()} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-red-800 dark:hover:bg-red-900">
                                                                    <svg className="-ml-0.5 mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path></svg>
                                                                    Change Network
                                                                </button>
                                                                <button type="button" className="text-red-700 bg-transparent border border-red-700 hover:bg-red-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:border-red-800 dark:text-red-800 dark:hover:text-white" data-dismiss-target="#alert-error" aria-label="Close" onClick={() => setAlertClose(true)}>
                                                                    Dismiss
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ) : ''
                                                }
                                                <ul className='wallet-list'>
                                                    {
                                                        Wallets.map(item => {
                                                            return (
                                                                <li key={item.title} className='wallet-item border border-white rounded-lg p-4 m-2 shadow-img hover:border-main hover:shadow'>
                                                                    <button className='flex w-full items-center justify-between text-white' type='button' onClick={onConnectWallet(item)} disabled={isSelectingWallet ? false : true}>
                                                                        <div className='wallet-detail flex items-center justify-center'>
                                                                            <div className='wallet-img w-8 h-8'>
                                                                                <img src={item.logo.src} />
                                                                            </div>
                                                                            <div className='wallet-name ml-4'>
                                                                                <span>{item.title}</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className='wallet-info flex items-center justify-end'>
                                                                            {/* {item.title == 'MetaMask' && (
                                                                                <div className='type text-sm'>Popular</div>
                                                                            )} */}
                                                                            <div className='loading'>
                                                                                {
                                                                                    !isSelectingWallet && activatingConnector == item.connector && (
                                                                                        <div className="spinner-border border-r-transparent animate-spin inline-block ml-2 w-6 h-6 border-4 rounded-full text-blue-300" role="status">
                                                                                        </div>
                                                                                    )
                                                                                }
                                                                                {
                                                                                    connector == item.connector && active && (
                                                                                        <div className='state ml-4 text-main'>actived</div>
                                                                                    )
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </button>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-black px-4 py-3 flex items-center justify-center">
                                    {
                                        active && (
                                            <button
                                                type="button"
                                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm mb-2 px-4 py-2 bg-main text-base font-medium text-white hover:bg-main focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main sm:ml-3 sm:w-auto sm:text-sm"
                                                onClick={onDeactiveWallet}
                                            >
                                                Disconnect Wallet
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root >
        </>
    )
}
