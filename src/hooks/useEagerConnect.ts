import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "@/config/assets/constants/connectors";

export function useEagerConnect() {
    const { activate, active } = useWeb3React();

    const [tried, setTried] =  useState(false);

    useEffect(() => {
        if (sessionStorage.close == "false") {
            injected.isAuthorized().then((isAuthorized) => {
                if (isAuthorized) {
                    activate(injected, undefined, true).catch(() => {
                        !tried && setTried(true);
                    });
                } else {
                    !tried && setTried(true);
                }
            });
        } else {
            return;
        }
    }, [activate]); // intentionally only running on mount (make sure it's only mounted once :))

    // if the connection worked, wait until we get confirmation of that to flip the flag
    useEffect(() => {
        if (!tried && active) {
            setTried(true);
        }
    }, [tried, active]);

    return tried;
}