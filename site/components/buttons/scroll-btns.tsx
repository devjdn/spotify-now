'use client';

import  { useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ScrollBtnProps {
    scrollTargetSelector : string;
}

export const ScrollBtns = ({ scrollTargetSelector }: ScrollBtnProps) => {
    const [scrollContainer, setScrollContainer] = useState<HTMLUListElement | null>(null);
    const [isScrolling, setIsScrolling] = useState(false);

    useEffect(() => {
        const container = document.querySelector(scrollTargetSelector) as HTMLUListElement | null;
        setScrollContainer(container);
    }, [scrollTargetSelector]);

    const scroll = useCallback((direction: 'left' | 'right') => {
        if(scrollContainer && !isScrolling) {
            setIsScrolling(true);
            scrollContainer.scrollBy({
                left: direction === 'left' ? -280 : 280,
                behavior: 'smooth',
            });

            setTimeout(() => setIsScrolling(false), 400)
        }
    }, [scrollContainer, isScrolling]);

    const scrollRight = useCallback(() => scroll('right'), [scroll]);
    const scrollLeft = useCallback(() => scroll('left'), [scroll]);

    return(
        <div className="scroll-btn-group">
            <button className="scroll-btn scroll-left" onClick={scrollLeft} disabled={isScrolling}><ChevronLeft/></button>
            <button className="scroll-btn scroll-right" onClick={scrollRight} disabled={isScrolling}><ChevronRight/></button>
        </div>
    );
}