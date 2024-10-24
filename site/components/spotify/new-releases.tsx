'use client';

import { useState, useEffect } from 'react';
import { fetchNewReleases } from "@/api/home-api-calls";
import { SpotifyNewReleases } from "@/lib/global";
import { ShelfContainer, ShelfHeader, ShelfScroll, ShelfUl, ShelfLi } from "../shelf/shelf";
import { ScrollBtns } from "../buttons/scroll-btns";

const NewReleases = ({accessToken}: {accessToken: string}) => {

    const [newReleases, setNewReleases] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        const updateLimit = () => {
            const screenWidth = window.innerWidth;

            switch (true) {
                case (screenWidth > 1500):
                    setLimit(12);
                    break;
                case (screenWidth > 1200):
                    setLimit(10);
                    break;
                case (screenWidth > 900):
                    setLimit(8);
                    break;
                case (screenWidth > 600):
                    setLimit(6);
                    break;
                default:
                    setLimit(10);
            }
        };

        updateLimit();

        window.addEventListener('resize', updateLimit);

        return () => {
            window.removeEventListener('resize', updateLimit);
        };
    }, []);

    useEffect(() => {
        const loadNewReleases = async () => {
            try {
                const data: SpotifyNewReleases = await fetchNewReleases(currentPage * limit, {accessToken, limit});
                setNewReleases(data.items);
                console.log(data)
            } catch (error) {
                console.error("Failed to load new releases:", error);
            }
        }
        loadNewReleases();
    }, [currentPage]);

    const nextPage = () => {
        setCurrentPage(prevPage => prevPage + 1)
    }

    const previousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    }


    return(
        <section className="new-releases" id="new-drops">
            <ShelfContainer>
                <ShelfHeader shelfTitle="New Releases">
                    <div className="page-btns">
                        <button className="page-btn" onClick={previousPage} disabled={currentPage === 0}>back</button><button className="page-btn" onClick={nextPage} disabled={currentPage === 3}>forward</button>
                    </div>
                </ShelfHeader>
                <ShelfScroll>
                <ShelfUl>
                    {newReleases.map((items, itemIndex) => (
                        <ShelfLi key={itemIndex} itemArtwork={items.images[0]?.url} itemTitle={items.name} itemDetails={items.artists[0].name} titleId={`/album/${items.id}`} detailsId={`/artist/${items.artists[0].id}`}/>
                    ))}
                </ShelfUl>
                </ShelfScroll>
            </ShelfContainer>
        </section>
    );
}

export default NewReleases;
