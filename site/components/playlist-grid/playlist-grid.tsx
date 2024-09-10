import React from "react";
import { Clock } from "lucide-react";


export function GridContainer({children}:{children:React.ReactNode}) {
    return(
        <div className="grid-container">
            {children}
        </div>
    );
}
export function GridHeader() {
    return(
        <header className="grid-header">
            <div className="grid-col">
                <strong>Title</strong>
            </div>
            <div className="grid-col">
                <strong>Album</strong>
            </div>
            <div className="grid-col">
                <Clock size={20}/>
            </div>
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