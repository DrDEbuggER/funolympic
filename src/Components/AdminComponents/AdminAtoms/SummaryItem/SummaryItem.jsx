
import "./SummaryItem.css"

export const SummaryItem = ({CustomIcon, summaryTitle, summaryResult}) => {
    return (
        <div className="summary__item">
            <div className="summary__itemTitle">{summaryTitle}</div>
            <div className="summary__itemResult summary__positive">
                <CustomIcon fontSize='small'/>
                <div className="resultAmount">{summaryResult}</div>
            </div>
        </div>
    )
}