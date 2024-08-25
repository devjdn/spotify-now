import React from "react";

export function GridContainer({children}:{children:React.ReactNode}) {
    return(
        <div className="grid-container">
            {children}
        </div>
    );
}
export function GridHeader({children}:{children:React.ReactNode}) {
    return(
        <header className="grid-header">
            {children}
        </header>
    );
}
export function GridList({children}:{children:React.ReactNode}) {
    return(
        <ul className="grid-ul">
            {children}
        </ul>
    );
}
export function GridRow({children}:{children:React.ReactNode}) {
    return(
        <li className="grid-li">
            {children}
        </li>
    );
}