import { AppProps } from 'next/app';
import { useEffect } from "react";
import { useRouter } from "next/router";
import '@/styles/colors.css';
import '@/styles/globals.css';
import '@/styles/home.css';
import '@/styles/font.css';

import Web3Provider from "@/providers/web3Provider";
import RoomProvider from '@/providers/roomProvider';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const handleRouteChange = (url: any) => {
    // window.gtag("config", "[Tracking ID]", {
    //   page_path: url,
    // });
  };

  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Web3Provider>
        <RoomProvider>
            <Component {...pageProps} />
        </RoomProvider>
      </Web3Provider>
      <ToastContainer
        position="bottom-left"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        closeOnClick
        pauseOnHover
      />
    </>
  );
}

export default MyApp;
