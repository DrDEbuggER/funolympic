
import { IconButton } from "@mui/material"
import { FunVideoPlayer } from "../../CommonComponents"
import { FunChatBox } from "../FunChatBox"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import {
    FacebookIcon,
    FacebookShareButton, FacebookShareCount, TwitterIcon, TwitterShareButton
} from "react-share"
import "./FunBroadcastMain.css"
import ads from "../../../assets/images/ads.svg"
import ShareIcon from '@mui/icons-material/Share';
import { ThumbDownAlt, ThumbDownOffAlt, ThumbUpOffAlt } from "@mui/icons-material";
import { useEffect } from "react";
import { collection, getDocs, limitToLast, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { firestore } from "../../../firebase";
import { useState } from "react";
import { useParams } from "react-router-dom";
export const FunBroadcastMain = ({}) => {

    const [liveVideoData, setLiveVideoData] = useState()
    const QueryDocs = (setData, videoID) => {
        const queryRef =  query(collection(firestore, `/lives`), where("videoID", "==", videoID))
        onSnapshot(queryRef, (snap)=> {
            setData(snap.docs[0].data())
        })
    }
    
    // Query Latest Live video
    const QueryLatestLiveVideo = async(setData, category) => {
        const queryRef = category == "none" ? query(collection(firestore, `/lives`), orderBy("uploadedAt","asc"), limitToLast(1)) : query(collection(firestore, `/highlights`), where("category", "==", category))
        await getDocs(queryRef).then((snap)=>{
            setData(snap.docs[0].data())
            // console.log("snap", snap)
        })
    }

    const {videoID} = useParams()
    useEffect (()=> {
        console.log("videourlid", videoID)
        if (videoID) {
            QueryDocs(setLiveVideoData, videoID)
        } else {
            QueryLatestLiveVideo(setLiveVideoData, "none")
        }
    },[])

    return (
        <div className="fun__broadcastMain">
            <div className="fun__broadcastMainWrapper">
                <div className="fun__broadcastLiveWatch">
                    {console.log(liveVideoData)}
                    <FunVideoPlayer isPlayable={true} width="100%" height="100%" isLive={true} thumb={`https://wallpapercave.com/wp/wp7442159.png`} url={liveVideoData && liveVideoData.videoURL? liveVideoData.videoURL : ""} />
                    <div className="fun__videoDesc">
                        <div className="fun__videoDescHead">
                            <h2> { liveVideoData && liveVideoData.videoTitle ? liveVideoData.videoTitle : ""} </h2>
                            <div className="fun__videoStatus">
                                <div className="fun__videoViews">
                                    <p>{`- ${liveVideoData && liveVideoData.eventType? liveVideoData.eventType.toUpperCase() : ''} Live`}</p>
                                </div>
                                <div className="fun__videoButtons">
                                    <div className="fun__miniButtons">
                                    <IconButton color="primary" aria-label="upload picture" component="label">
                                        <ThumbUpOffAlt />
                                    </IconButton>
                                        <p>1</p>
                                    </div>
                                    <div className="fun__miniButtons">
                                        <IconButton color="primary" aria-label="upload picture" component="label">
                                            <ThumbDownOffAlt />
                                        </IconButton>
                                        <p>0</p>
                                    </div>
                                    <div className="fun__miniButtons">
                                        {/* <IconButton color="primary" aria-label="upload picture" component="label">
                                            <ShareIcon />
                                        </IconButton> */}
                                        
                                        <div className="fun__shareButtons">
                                            <p>Share</p>
                                            <FacebookShareButton url={window.location.href}>
                                                <FacebookIcon size={20} />
                                            </FacebookShareButton>
                                            <TwitterShareButton url={window.location.href}>
                                                <TwitterIcon size={20} />
                                            </TwitterShareButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fun__broadcastChatBox">
                    <FunChatBox game={liveVideoData && liveVideoData.eventType ? liveVideoData.eventType: "football"}/>
                </div>
            </div>
            <div className="fun__videoLowerDesc">
                <div className="fun__videoDetails">
                    { 
                        liveVideoData && liveVideoData.videoDesc ? <p>{liveVideoData.videoDesc}</p>:
                            <p></p>
                    }
                </div>
                <div className="fun__advertisement">
                    <img src={ads}></img>
                </div>
            </div>
        </div>
    )
}