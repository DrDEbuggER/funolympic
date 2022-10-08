
import { IconButton } from "@mui/material"
import { FunLandscapeCardBox, FunSearchBar, FunVideoPlayer } from "../../CommonComponents"
import { FunChatBox } from "../FunChatBox"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import "./FunHighlights.css"
import ads from "../../../assets/images/ads.svg"
import ShareIcon from '@mui/icons-material/Share';
import { ThumbDown, ThumbDownAlt, ThumbDownOffAlt, ThumbUpOffAlt } from "@mui/icons-material";
import { useEffect } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs, limitToLast, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
import { useState } from "react";
import { auth, firestore } from "../../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton } from "react-share";
export const FunHighlights = () => {
    const [highlightData, setHighlightData] = useState()
    const [singleHighlightData, setSingleHighlightData] = useState()
    const [totalLike, setTotalLike] = useState(0)
    const [hasLiked, setHasLiked] = useState(false)
    const [totalDisLike, setTotalDislike] = useState(0)
    const [hasDisliked, setHasDisliked] = useState(false)
    const funNavigate = useNavigate()
    

    // query all highlight video
    const QueryDocs = async (setData, category) => {
        const queryRef = category == "none" ? query(collection(firestore, `/highlights`)) : query(collection(firestore, `/highlights`), where("category", "==", category))
        let vData = [];
        await getDocs(queryRef).then((snap)=> {
            snap.docs.forEach((doc)=> {
                vData.push(doc.data())
            })
            setData(vData)
        })
    }

    // Query Latest video
    const QueryLatestVideo = async(setData, category) => {
        const queryRef = category == "none" ? query(collection(firestore, `/highlights`), orderBy("uploadedAt","asc"), limitToLast(1)) : query(collection(firestore, `/highlights`), where("category", "==", category))
        await getDocs(queryRef).then((snap)=>{
            setData(snap.docs[0].data())
            // console.log("snap", snap)
        })
        
    }

    // query video by id
    const QueryByvideoID = (setData, videoID) => {
        const queryRef =  query(collection(firestore, `/highlights`), where("videoID", "==", videoID))
        onSnapshot(queryRef, (snap)=> {
            setData(snap.docs[0].data())
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
        const likeRef = query(collection(firestore, "highlights"), where("videoID", "==", vidID));
        await getDocs(likeRef).then(async(snap)=> {
            setTotalLike(snap.docs[0].data().likeCount)
        })
    }

    const CalcTotalDisLike = async(vidID) => {
        const likeRef = query(collection(firestore, "highlights"), where("videoID", "==", vidID));
        await getDocs(likeRef).then(async(snap)=> {
            setTotalDislike(snap.docs[0].data().dislikeCount)
        })
    }

    const FunUpdateLikes = async(vidID) => {
        const likeRef = query(collection(firestore, "highlights"), where("videoID", "==", vidID));
        const likerRef = query(collection(firestore, "likers"), where("uid", "==", auth.currentUser.uid),where("vidID", "==", vidID))
        const dislikerRef = query(collection(firestore, "dislikers"), where("uid", "==", auth.currentUser.uid),where("vidID", "==", vidID))
        if (!hasLiked) {
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
                await updateDoc(doc(firestore, "highlights", snap.docs[0].id), {"likeCount": tempLikeCount, "dislikeCount": tempDislikeCount}).then(async(res)=>{
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
        const likeRef = query(collection(firestore, "highlights"), where("videoID", "==", vidID));
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
                await updateDoc(doc(firestore, "highlights", snap.docs[0].id), {"likeCount": tempLikeCount, "dislikeCount": tempDislikeCount}).then(async(res)=>{
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
    useEffect(()=>{
        if(videoID) {
            QueryByvideoID(setSingleHighlightData, videoID)
            UserHasLiked(videoID)
            CalcTotalLike(videoID)
            CalcTotalDisLike(videoID)
            UserHasDisliked(videoID)
        } else {
            QueryLatestVideo(setSingleHighlightData, "none")
        }
        QueryDocs(setHighlightData, "none")
    },[videoID])

    const FilterDocs = async(keywords, documentPath, eventType) => {
        const q = eventType ? query(collection(firestore, documentPath), where("eventType", "==", eventType)) : query(collection(firestore, documentPath))
        // const q = query(collection(firestore, documentPath))
        const snapQuery = await getDocs(q);
        let fireDocuments = []
        let tempData = []
        snapQuery.forEach((doc) => {
            console.log("docs", doc.data())
            fireDocuments.push(doc.data())
        })
        if(fireDocuments.length > 0) {
            tempData = fireDocuments.filter((doc)=>{
                if (keywords === "") {
                    return []
                } else {
                    return doc.videoTitle.toLowerCase().includes(keywords)
                }
            })
            setHighlightData(tempData)
        }
    }

    const HandleSearch = async(e) => {
        e.preventDefault();
        // FilterDocs(e.target.value, "/highlights/men/Games", "swimming")
        FilterDocs(e.target.value, "/highlights", "")
    }

    const HandlePostClick = (videoID) => {
        console.log(videoID)
        funNavigate(`/highlights/watch/${videoID}`)
    }


    return (
        <div className="fun__highlightsMain">
            <div className="fun__highlightsMainWrapper">
                <div className="fun__highlightsLiveWatch">
                    <FunVideoPlayer width="100%" height="100%" url={singleHighlightData && singleHighlightData.videoURL? singleHighlightData.videoURL: ``} control={true} isPlayable={true}/>
                    <div className="fun__videoDesc">
                        <div className="fun__videoDescHead">
                            <h2> {singleHighlightData && singleHighlightData.videoTitle ? singleHighlightData.videoTitle: ""} </h2>
                            <div className="fun__videoStatus">
                                <div className="fun__videoViews">
                                    <p>{`- ${singleHighlightData && singleHighlightData.eventType ? singleHighlightData.eventType.toUpperCase(): ""} Highlight`}</p>
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
                    <div className="fun__highlightVideoDetails">
                        {
                            singleHighlightData && singleHighlightData.videoDesc ? <p>{singleHighlightData.videoDesc}</p>: 
                                <p></p>
                        }
                        
                    </div>
                </div>
                <div className="fun__highlightsVideoBox">
                    <FunSearchBar placeholder={`Search Highlights`} handleSearch={HandleSearch} className={`fix__searchWidth`}/>
                    <div className="fun__highlightList">
                        {
                        highlightData && highlightData.map((vDat, idx) => {
                                return <FunLandscapeCardBox key={idx}
                                    imageURL={vDat.thumbnail}
                                    // videoURL={vDat.videoURL}
                                    title={vDat.videoTitle}
                                    category={vDat.category}
                                    description={vDat.videoDesc}
                                    HandleClick={HandlePostClick}
                                    postID = {vDat.videoID}
                                    />
                            })
                        }
                    </div>
                    
                </div>
            </div>
        </div>
    )
}