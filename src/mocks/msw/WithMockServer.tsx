"use client";

import { useEffect, useState } from "react";

export default function WithMockServer({ children }: Readonly<{ children: React.ReactNode }>) {
    const [mswReady, setMswReady] = useState(false);

    useEffect(() => {
        const init = async () => {
            const initMsw = await import("./index").then((res) => res.initMsw);
            await initMsw();
            setMswReady(true);
        };

        if (!mswReady) {
            init();
        }
    }, [mswReady]);

    if (!mswReady) {
        return <>Mock Server is being initialized...</>;
    }

    return <>{children}</>;
}
