
import { IconButton } from "@mui/material"
import { FunVideoPlayer } from "../../CommonComponents"
import { FunChatBox } from "../FunChatBox"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import "./FunBroadcastMain.css"
import ShareIcon from '@mui/icons-material/Share';
import { ThumbDownAlt, ThumbDownOffAlt, ThumbUpOffAlt } from "@mui/icons-material";
export const FunBroadcastMain = () => {
    return (
        <div className="fun__broadcastMain">
            <div className="fun__broadcastMainWrapper">
                <div className="fun__broadcastLiveWatch">
                    <FunVideoPlayer width="100%" height="100%" url="https://www.youtube.com/watch?v=jzJW0gTYB9k"/>
                    <div className="fun__videoDesc">
                        <div className="fun__videoDescHead">
                            <h2> Japan VS Spain - Women's Bronze Medal Match - Football </h2>
                            <div className="fun__videoStatus">
                                <div className="fun__videoViews">
                                    <p>12 views - Football Live</p>
                                </div>
                                <div className="fun__videoButtons">
                                    <div className="fun__miniButtons">
                                    <IconButton color="primary" aria-label="upload picture" component="label">
                                        <ThumbUpOffAlt />
                                    </IconButton>
                                        <p>10</p>
                                    </div>
                                    <div className="fun__miniButtons">
                                        <IconButton color="primary" aria-label="upload picture" component="label">
                                            <ThumbDownOffAlt />
                                        </IconButton>
                                        <p>2</p>
                                    </div>
                                    <div className="fun__miniButtons">
                                        <IconButton color="primary" aria-label="upload picture" component="label">
                                            <ShareIcon />
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fun__broadcastChatBox">
                    <FunChatBox game="football"/>
                </div>
            </div>
        </div>
    )
}