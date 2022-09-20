import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { FunVideoPlayer } from '../../CommonComponents';
import "./FunAtoms.css"
export const FunCardBox = ({watchType, isVideo}) => {
    return (
        <div className="fun__cardBoxWrapper">
            <div className="fun__cardBox">
                <div className="fun__cardHeader">
                    <div className="fun__cardHeaderLive">
                        <PlayArrowIcon />
                        <p>Live</p>
                    </div>
                    <div className="fun__cardBrief">    
                        <p>Swimming</p>
                        <p>Men</p>
                    </div>
                </div>
                <div className="fun__cardMid">
                    <div className="fun__fixtureDate">
                        {/* <p>Feb 21</p> */}
                    </div>
                    <div className="fun__liveGameTitle">
                        <p>Swimming | Olympic Qualifier | ISA World Games | Huntington BeachSwimming | Olympic Qualifier </p>
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
                        <img src="https://images.unsplash.com/photo-1600965962102-9d260a71890d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"></img>
                    }
                </div>
            </div>
        </div>
    )
}