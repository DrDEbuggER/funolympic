import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { FunVideoPlayer } from '../../CommonComponents';
import "./FunAtoms.css"
export const FunCardBox = ({watchType, isVideo, videoTitle, eventType, category, thumbnail, videoID, HandleClick}) => {
    return (
        <div className="fun__cardBoxWrapper">
            <div className="fun__cardBox">
                <div className="fun__cardHeader">
                    <div className="fun__cardHeaderLive">
                        <PlayArrowIcon />
                        <p>Live</p>
                    </div>
                    <div className="fun__cardBrief">    
                        <p>{eventType}</p>
                        <p>{category}</p>
                    </div>
                </div>
                <div className="fun__cardMid">
                    <div className="fun__fixtureDate">
                        {/* <p>Feb 21</p> */}
                    </div>
                    <div className="fun__liveGameTitle">
                        <p>{videoTitle}</p>
                    </div>
                </div>
                <div className="fun__cardBottom">
                    {
                        isVideo ? 
                        <video className='fun__cardVidHeight' src={`https://firebasestorage.googleapis.com/v0/b/bayjingfunolympic2022.appspot.com/o/files%2Fjohn_sherchan%20.mp4?alt=media&token=3c7f6f3d-9715-46f9-9bd9-0edb99c0d1a0`} 
                                // width="100%"
                                // height="100%"
                            />
                        :
                        <img src={thumbnail} onClick={()=>HandleClick(videoID)}></img>
                    }
                </div>
            </div>
        </div>
    )
}