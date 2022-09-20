
import "./FunVideoCardBox.css"
export const FunLandscapeCardBox = ({title, description, category, isVideo}) => {
    const trimLongString = (longStr, len) => {
        if (longStr.length > len) {
            return longStr.substring(0, len) + "..."
        }
        return longStr
    }
    return (
        <div className="fun__landscapeCardBoxWrapper">
            <div className="fun__landscapeCardBox">
                <div className="fun__lcbImageWrapper">
                    <img src={`https://images.hindustantimes.com/img/2021/07/29/550x309/AFP_9H43LC_1627581815806_1627581834538.jpg`}/>
                </div>
                <div className="fun__lcbBrief">
                    <div className="fun__lcbTitleWrapper">
                        <h3> {trimLongString(title, 20)} </h3>
                        <p> {category} </p>
                    </div>
                    <p> {trimLongString(description, 100)}</p>
                </div>
            </div>
        </div>
    )
}