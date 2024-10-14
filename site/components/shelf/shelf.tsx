import Link from "next/link";
import Image from "next/image";

interface ShelfHeaderProps {
    shelfTitle: string;
}
interface ShelfLiProps {
    itemArtwork: string;
    itemTitle: string;
    itemDetails: string;
    titleId: string;
    detailsId?: string;
}

export function ShelfContainer({children}:{children: React.ReactNode}) {
    return(
        <div className="shelf-container">
            {children}
        </div>
    );
}

export function ShelfHeader({shelfTitle}: ShelfHeaderProps) {
    return(
        <header className="shelf-header">
            <h3>{shelfTitle}</h3>
        </header>
    )
}

export function ShelfScroll({children}: {children: React.ReactNode}) {
    return (
        <div className="shelf-scroll">
            <div className="scroll-shadow left"></div>
            <div className="scroll-shadow right"></div>
            {children}
        </div>
    );
}

export function ShelfUl({children}: {children: React.ReactNode}) {
    return(
        <ul className="shelf-ul">
            {children}
        </ul>
    );
}

export function ShelfLi({itemArtwork, itemTitle, itemDetails, titleId, detailsId}: ShelfLiProps) {
    return(
        <li className="shelf-li">
            <div className="artwork-container">
                <Image fill loading="lazy" src={itemArtwork} alt={itemTitle}/>
            </div>
            <div className="details-container">
                <span className="song-text"><Link href={titleId}>{itemTitle}</Link></span>
                    {detailsId ? (
                        <span className="song-text"><Link href={detailsId}>{itemDetails}</Link></span>
                    ) : (
                        <span className="song-text">{itemDetails}</span>
                    )}
            </div>
        </li>
    );
}