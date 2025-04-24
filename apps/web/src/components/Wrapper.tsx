
import React from 'react';
import { PropsWithChildren } from "react";

const Wrapper: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    return (<div className="min-h-screen flex flex-col bg-muted/30">
        {children}
    </div>
    )
}
export default Wrapper;