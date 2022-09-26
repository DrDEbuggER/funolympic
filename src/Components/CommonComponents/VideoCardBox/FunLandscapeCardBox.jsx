// import HoverVideoPlayer from "react-hover-video-player"
import { HoverVideoPlayer } from "../FunVideoPlayer"
import "./FunVideoCardBox.css"
export const FunLandscapeCardBox = ({title, description, category, videoURL, imageURL,isVideo, postID,  HandleClick}) => {
    const trimLongString = (longStr, len) => {
        if (longStr.length > len) {
            return longStr.substring(0, len) + "..."
        }
        return longStr
    }
    // dnyyncqsw
    return (
        <div className="fun__landscapeCardBoxWrapper">
            <div className="fun__landscapeCardBox" onClick={()=> HandleClick(postID)}>
                <div className="fun__lcbImageWrapper">
                    <img src={imageURL}/>
                    {
                        // videoURL ? <HoverVideoPlayer videoSrc={videoURL} /> : <img src={imageURL}/>
                    }
                </div>
                <div className="fun__lcbBrief">
                    <div className="fun__lcbTitleWrapper">
                        <h3> {trimLongString(title, 20)} </h3>
                        <p> {category} </p>
                    </div>
                    <p> {trimLongString(description, 95)}</p>
                </div>
            </div>
        </div>
    )
}