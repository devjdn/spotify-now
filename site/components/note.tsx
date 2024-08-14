import React from "react";

export default function Note({children}: {children: React.ReactNode}) {
    return(
        <span className="note"><span className="brand">Note: </span>{children}</span>
    );
}