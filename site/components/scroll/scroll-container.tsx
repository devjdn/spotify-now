import React from "react";

export function ScrollContainer({ children }: { children: React.ReactNode }) {
    return(
        <div className="scroll-container">
            {children}
        </div>
    );
}

export function ScrollList({children}:{children:React.ReactNode}){
    return(
        <ul className="scroll-ul">
            {children}
        </ul>
    );
}

export function ScrollListItem({children}:{children:React.ReactNode}) {
    return(
        <li className="scroll-li">
            {children}
        </li>
    );
}