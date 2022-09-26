
import "./FunVideoPlayer.css"
export const HoverVideoPlayer = ({videoSrc}) => {
    return (
        <div className="fun__hoverVideoPlayerWrapper">
            <video
                src={videoSrc} 
                // preload="none"
                />
        </div>
    )
}