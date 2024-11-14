interface TooltipProps {
    tooltipText: string;
}

export default function NavTooltip({tooltipText}: TooltipProps){
    return(
        <div className="tooltip">
            <p>{tooltipText}</p>
        </div>
    );
}