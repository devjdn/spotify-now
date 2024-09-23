'use client';

import  { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ScrollBtnProps {
    scrollTargetSelector : string;
}

export const ScrollBtns = ({ scrollTargetSelector }: ScrollBtnProps) => {
    const [scrollContainer, setScrollContainer] = useState<HTMLUListElement | null>(null);

    useEffect(() => {
        const container = document.querySelector(scrollTargetSelector) as HTMLUListElement | null;
        setScrollContainer(container);
    }, [scrollTargetSelector]);

    const scrollLeft = () => {
        if (scrollContainer) {
            scrollContainer.scrollBy({
                left: -320,
                behavior: 'smooth',
            });
        }
    }
    const scrollRight = () => {
        if (scrollContainer) {
            scrollContainer.scrollBy({
                left: 320,
                behavior: 'smooth',
            });
        }
    }

    return(
        <div className="scroll-btn-group">
            <button className="scroll-btn scroll-left" onClick={scrollLeft}><ChevronLeft/></button>
            <button className="scroll-btn scroll-right" onClick={scrollRight}><ChevronRight/></button>
        </div>
    );
}