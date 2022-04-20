import { useWeb3React } from "@web3-react/core";
import { injected, walletconnect } from "./connectors";
import MetaMaskLogo from "../img/wallets/1.png";
import WalletConnect from "../img/wallets/4.png";
import CoinBase from "../img/wallets/5.png";

const Wallets = [
    {
        title: "MetaMask",
        description: "Connect to your MetaMask Wallet",
        logo: MetaMaskLogo,
        connector: injected,
    },
    {
        title: "WalletConnect",
        description: "Connect to your WalletConnect Wallet",
        logo: WalletConnect,
        connector: walletconnect,
    },
    {
        title: "CoinbaseWallet",
        description: "Open in Coinbase Wallet app.",
        logo: CoinBase,
        connector: walletconnect,
    }
];

const ConnectedWallet = () => {
    const { connector } = useWeb3React();
    if (connector) {
        switch (connector) {
            case injected: {
                return {
                    name: "MetaMask",
                    logo: MetaMaskLogo,
                };
            }
            case walletconnect: {
                return {
                    name: "WalletConnect",
                    logo: WalletConnect,
                };
            }
        }
    } else {
        return {};
    }
};

export { Wallets, ConnectedWallet };
