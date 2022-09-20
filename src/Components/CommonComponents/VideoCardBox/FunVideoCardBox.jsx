
import "./FunVideoCardBox.css"
export const FunVideoCardBox = ({thumbnail, vidTitle, vidEvent}) => {
    const trimLongString = (longStr) => {
        if (longStr && longStr.length > 45) {
            return longStr.substring(0, 45) + "..."
        }
        return longStr
    }
    return (
        <div className="fun__videoCardBoxWrapper">
            <div className="fun__videoCardBox">
                <div className="fun__vidThumbWrapper">
                    <img src={thumbnail}></img>
                </div>
                <div className="fun__vidHighlightDesc">
                    <h3>{trimLongString(vidTitle)}</h3>
                    <p>{trimLongString(vidEvent)}</p>
                    <p>1 views</p>
                </div>
            </div>
        </div>
    )
}