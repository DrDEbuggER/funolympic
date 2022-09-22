
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
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { firestore } from "../../../firebase";
import { useState } from "react";
import { useParams } from "react-router-dom";
export const FunBroadcastMain = ({}) => {

    const [liveVideoData, setLiveVideoData] = useState()
    const QueryDocs = (setData, videoID) => {
        const queryRef =  query(collection(firestore, `/livestream`), where("videoID", "==", videoID))
        onSnapshot(queryRef, (snap)=> {
            setData(snap.docs[0].data())
        })
    }
    
    const {videoID} = useParams()
    useEffect (()=> {
        console.log("videourlid", videoID)
        if (videoID) {
            QueryDocs(setLiveVideoData, videoID)
        }
    },[])

    return (
        <div className="fun__broadcastMain">
            <div className="fun__broadcastMainWrapper">
                <div className="fun__broadcastLiveWatch">
                    {console.log(liveVideoData)}
                    <FunVideoPlayer width="100%" height="100%" url={liveVideoData && liveVideoData.videoURL? liveVideoData.videoURL : "https://www.youtube.com/watch?v=jzJW0gTYB9k"} />
                    <div className="fun__videoDesc">
                        <div className="fun__videoDescHead">
                            <h2> { liveVideoData && liveVideoData.videoTitle ? liveVideoData.videoTitle : "Japan VS Spain - Women's Bronze Medal Match - Football"} </h2>
                            <div className="fun__videoStatus">
                                <div className="fun__videoViews">
                                    <p>{`12 views - ${liveVideoData && liveVideoData.eventType? liveVideoData.eventType : 'Football'} Live`}</p>
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
                                        {/* <IconButton color="primary" aria-label="upload picture" component="label">
                                            <ShareIcon />
                                        </IconButton> */}
                                        
                                        <div className="fun__shareButtons">
                                        {/* <FacebookShareCount url={"http://hello.com"}>
                                            {shareCount => <span className="myShareCountWrapper">{shareCount}</span>}
                                        </FacebookShareCount>    */}
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
                        liveVideoData && liveVideoData.videoDesc ? liveVideoData.videoDesc:
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus vestibulum sed arcu non odio. Eu nisl nunc mi ipsum faucibus vitae aliquet. Dui id ornare arcu odio ut sem nulla pharetra diam. Donec ac odio tempor orci. Neque convallis a cras semper auctor neque vitae tempus. Urna molestie at elementum eu facilisis sed. Proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo. Amet justo donec enim diam. Interdum posuere lorem ipsum dolor sit amet consectetur. Maecenas volutpat blandit aliquam etiam erat velit. Id porta nibh venenatis cras sed felis eget velit aliquet. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Luctus accumsan tortor posuere ac ut consequat semper.</p>
                    }
                </div>
                <div className="fun__advertisement">
                    <img src={ads}></img>
                </div>
            </div>
        </div>
    )
}