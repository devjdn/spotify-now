import React from "react";

export function GridToScrollContainer({children}:{children:React.ReactNode}){
    return(
        <div className="grid-to-scroll-container">
            {children}
        </div>
    );
}
export function GridToScrollUl({children}:{children:React.ReactNode}){
    return(
        <ul className="grid-to-scroll-ul">
            {children}
        </ul>
    );
}
export function GridToScrollLi({children}:{children:React.ReactNode}){
    return(
        <li className="grid-to-scroll-li">
            {children}
        </li>
    );
}