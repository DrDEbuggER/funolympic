
import "./FunVideoCardBox.css"
export const FunVideoCardBox = ({thumbnail, vidTitle, vidEvent}) => {
    return (
        <div className="fun__videoCardBoxWrapper">
            <div className="fun__videoCardBox">
                <div className="fun__vidThumbWrapper">
                    <img src={thumbnail}></img>
                </div>
                <div className="fun__vidHighlightDesc">
                    <h3>{vidTitle}</h3>
                    <p>{vidEvent}</p>
                    <p>1 views</p>
                </div>
            </div>
        </div>
    )
}