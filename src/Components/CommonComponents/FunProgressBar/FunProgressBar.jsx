
import "./FunProgressBar.css"
export const FunProgressBar = ({percentage, isUpdated}) => {
    return (
        <div className="fun__prograssBarWrapper">
            <div className="fun__progressBarContainer">
                <div className="fun__progressBar" style={{width: `${percentage}%`}}></div>
            </div>
            <div className="fun__progComplete">
                {
                    percentage && percentage === 100 ? <p>{isUpdated? 'Updated': 'Completed'}</p> : 
                    percentage ? <p>{`Uploading... ${percentage}%`}</p> : ""
                }
            </div>
        </div>
    )
}