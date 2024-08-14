'use client';

import { useState, useEffect } from "react";

import { Search } from "lucide-react";
import Note from "../note";

export default function SearchMenu() {
    const [isHidden, setIsHidden] = useState<boolean>(true);

    const searchResults: string[] = [];

    const toggleMenu = () => {
        setIsHidden(!isHidden);
    }

    return(
        <>
            <button className="search-menu-btn" onClick={toggleMenu}>
                <Search/>
            </button>

            <div className="overlay" onClick={toggleMenu} aria-hidden={isHidden}></div>

            <div className="search-menu-wrapper" aria-hidden={isHidden}>
                <div className="search-wrapper">
                    <input type="text" placeholder="Search our reviews..."/>
                    <kbd>k</kbd>
                </div>
                <div className="quick-results">
                    <ul className="quick-results-list">
                        {searchResults.length === 0 ? (
                            <li className="result-item">
                                <p>No results found</p>
                            </li>
                        ) : (
                            searchResults.map((result, index) => (
                                <li className="search-result-item" key={index}>{result}</li>
                            ))
                        )}
                    </ul>
                </div>
                <Note>Click anywhere around the search menu to close the pop-up.</Note>
            </div>
        </>
    );
}
