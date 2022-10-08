
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
import { ThumbDown, ThumbDownAlt, ThumbDownOffAlt, ThumbUpOffAlt } from "@mui/icons-material";
import { useEffect } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs, limitToLast, onSnapshot, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";
import { auth, firestore } from "../../../firebase";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { async } from "@firebase/util";
export const FunBroadcastMain = ({}) => {

    const [liveVideoData, setLiveVideoData] = useState()
    const [totalLike, setTotalLike] = useState(0)
    const [hasLiked, setHasLiked] = useState(false)
    const [totalDisLike, setTotalDislike] = useState(0)
    const [hasDisliked, setHasDisliked] = useState(false)
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

    
    const UserHasLiked = async(vidID) => {
        const likerRef = query(collection(firestore, "likers"), where("uid", "==", auth.currentUser.uid),where("vidID", "==", vidID))
        await getDocs(likerRef).then(async(snap)=> {
            if (snap.docs.length <= 0) {
                setHasLiked(false)
            }else {
                setHasLiked(true)
            }
        })
    }

    const UserHasDisliked = async(vidID) => {
        const likerRef = query(collection(firestore, "dislikers"), where("uid", "==", auth.currentUser.uid),where("vidID", "==", vidID))
        await getDocs(likerRef).then(async(snap)=> {
            if (snap.docs.length <= 0) {
                setHasDisliked(false)
            }else {
                setHasDisliked(true)
            }
        })
    }

    const CalcTotalLike = async(vidID) => {
        const likeRef = query(collection(firestore, "lives"), where("videoID", "==", vidID));
        await getDocs(likeRef).then(async(snap)=> {
            setTotalLike(snap.docs[0].data().likeCount)
        })
    }

    const CalcTotalDisLike = async(vidID) => {
        const likeRef = query(collection(firestore, "lives"), where("videoID", "==", vidID));
        await getDocs(likeRef).then(async(snap)=> {
            setTotalDislike(snap.docs[0].data().dislikeCount)
        })
    }

    const FunUpdateLikes = async(vidID) => {
        const likeRef = query(collection(firestore, "lives"), where("videoID", "==", vidID));
        const likerRef = query(collection(firestore, "likers"), where("uid", "==", auth.currentUser.uid),where("vidID", "==", vidID))
        const dislikerRef = query(collection(firestore, "dislikers"), where("uid", "==", auth.currentUser.uid),where("vidID", "==", vidID))
        if (!hasLiked) {
            setHasLiked(true)
            await getDocs(likeRef).then(async(snap)=> {
                if (snap.docs.length <= 0) {
                    return
                }
                let tempLikeCount = snap.docs[0].data().likeCount + 1;
                let tempDislikeCount = snap.docs[0].data().dislikeCount;
                if (tempDislikeCount <= 0) {
                    tempDislikeCount = 0
                }else {
                    if (hasDisliked) {
                        tempDislikeCount -= 1;
                        await getDocs(dislikerRef).then(async(snap)=> {
                            await deleteDoc(doc(firestore, `dislikers`, snap.docs[0].id)).then(async(res)=>{
                                await getDocs(likeRef).then(async(snap)=>{
                                    setTotalDislike(snap.docs[0].data().dislikeCount)
                                    setHasDisliked(false)
                                })
                            })
                        })
                    }
                }
                await updateDoc(doc(firestore, "lives", snap.docs[0].id), {"likeCount": tempLikeCount, "dislikeCount": tempDislikeCount}).then(async(res)=>{
                    await getDocs(likerRef).then(async(snap)=> {
                        if (snap.docs.length <= 0) {
                            await addDoc(collection(firestore, `likers`), {
                                "vidID": vidID,
                                "uid": auth.currentUser.uid
                            }).then(async(res)=>{
                                await getDocs(likeRef).then(async(snap)=>{
                                    setTotalLike(snap.docs[0].data().likeCount)
                                    setTotalDislike(snap.docs[0].data().dislikeCount)
                                    setHasDisliked(false)
                                    setHasLiked(true)
                                })
                            })
                        }else {
                            await getDocs(likeRef).then(async(snap)=>{
                                setTotalLike(snap.docs[0].data().likeCount)
                            })
                        }
                    })
                })
            })
        } 
    }

    const FunUpdateDislikes = async(vidID) => {
        const likeRef = query(collection(firestore, "lives"), where("videoID", "==", vidID));
        const likerRef = query(collection(firestore, "likers"), where("uid", "==", auth.currentUser.uid),where("vidID", "==", vidID))
        const dislikerRef = query(collection(firestore, "dislikers"), where("uid", "==", auth.currentUser.uid),where("vidID", "==", vidID))
        if (!hasDisliked) {
            await getDocs(likeRef).then(async(snap)=> {
                if (snap.docs.length <= 0) {
                    return
                }
                let tempLikeCount = snap.docs[0].data().likeCount;
                let tempDislikeCount = snap.docs[0].data().dislikeCount + 1;
                if (tempLikeCount <= 0) {
                    tempLikeCount = 0
                }else {
                    if (hasLiked) {
                        tempLikeCount -= 1;
                        await getDocs(likerRef).then(async(snap)=> {
                            await deleteDoc(doc(firestore, `likers`, snap.docs[0].id)).then(async(res)=>{
                                await getDocs(likeRef).then(async(snap)=>{
                                    setTotalLike(snap.docs[0].data().likeCount)
                                    setHasLiked(false)
                                })
                            })
                        })
                    }
                }
                await updateDoc(doc(firestore, "lives", snap.docs[0].id), {"likeCount": tempLikeCount, "dislikeCount": tempDislikeCount}).then(async(res)=>{
                    await getDocs(dislikerRef).then(async(snap)=> {
                        if (snap.docs.length <= 0) {
                            await addDoc(collection(firestore, `dislikers`), {
                                "vidID": vidID,
                                "uid": auth.currentUser.uid
                            }).then(async(res)=>{
                                await getDocs(likeRef).then(async(snap)=>{
                                    setTotalLike(snap.docs[0].data().likeCount)
                                    setTotalDislike(snap.docs[0].data().dislikeCount)
                                    setHasLiked(false)
                                    setHasDisliked(true)
                                })
                            })
                        }else {
                            await getDocs(likeRef).then(async(snap)=>{
                                setTotalLike(snap.docs[0].data().likeCount)
                            })
                        }
                    })
                })
            })
        } 
    }

    const {videoID} = useParams()
    useEffect (()=> {
        console.log("videourlid", videoID)
        if (videoID) {
            QueryDocs(setLiveVideoData, videoID)
            UserHasLiked(videoID)
            CalcTotalLike(videoID)
            CalcTotalDisLike(videoID)
            UserHasDisliked(videoID)
        } else {
            QueryLatestLiveVideo(setLiveVideoData, "none")
        }
    },[])


    return (
        <div className="fun__broadcastMain">
            <div className="fun__broadcastMainWrapper">
                <div className="fun__broadcastLiveWatch">
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
                                        {
                                            hasLiked ? 
                                                <IconButton color="primary">
                                                    <ThumbUpIcon />
                                                </IconButton>
                                                :
                                                <IconButton color="primary" onClick={()=> FunUpdateLikes(videoID)}>
                                                    <ThumbUpOffAlt />
                                                </IconButton>
                                        }
                                        <p>{totalLike}</p>
                                    </div>
                                    <div className="fun__miniButtons">
                                        {
                                            hasDisliked ? 
                                                <IconButton color="primary">
                                                    <ThumbDown />
                                                </IconButton>
                                                :
                                                <IconButton color="primary" onClick={()=> FunUpdateDislikes(videoID)}>
                                                    <ThumbDownOffAlt />
                                                </IconButton>
                                        }
                                        <p>{totalDisLike}</p>
                                    </div>
                                    <div className="fun__miniButtons">
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