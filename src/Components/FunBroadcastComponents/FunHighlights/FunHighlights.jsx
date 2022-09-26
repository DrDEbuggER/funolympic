
import { IconButton } from "@mui/material"
import { FunLandscapeCardBox, FunSearchBar, FunVideoPlayer } from "../../CommonComponents"
import { FunChatBox } from "../FunChatBox"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import "./FunHighlights.css"
import ads from "../../../assets/images/ads.svg"
import ShareIcon from '@mui/icons-material/Share';
import { ThumbDownAlt, ThumbDownOffAlt, ThumbUpOffAlt } from "@mui/icons-material";
import { useEffect } from "react";
import { collection, getDocs, limitToLast, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useState } from "react";
import { firestore } from "../../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton } from "react-share";
export const FunHighlights = () => {
    const [highlightData, setHighlightData] = useState()
    const [singleHighlightData, setSingleHighlightData] = useState()
    const funNavigate = useNavigate()
    const {postID} = useParams()

    // query all highlight video
    const QueryDocs = (setData, category) => {
        const queryRef = category == "none" ? query(collection(firestore, `/highlights`)) : query(collection(firestore, `/highlights`), where("category", "==", category))
        let vData = [];
        onSnapshot(queryRef, (snap)=> {
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
    const QueryByPostID = (setData, postID) => {
        const queryRef =  query(collection(firestore, `/highlights`), where("videoID", "==", postID))
        onSnapshot(queryRef, (snap)=> {
            setData(snap.docs[0].data())
        })
    }

    useEffect(()=>{
        if(postID) {
            QueryByPostID(setSingleHighlightData, postID)
        } else {
            QueryLatestVideo(setSingleHighlightData, "none")
        }
        QueryDocs(setHighlightData, "none")
        
    },[postID])

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

    const HandlePostClick = (postID) => {
        console.log(postID)
        funNavigate(`/highlights/watch/${postID}`)
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
                                    <IconButton color="primary" aria-label="upload picture" component="label">
                                        <ThumbUpOffAlt />
                                    </IconButton>
                                        <p>{singleHighlightData ?1:''}</p>
                                    </div>
                                    <div className="fun__miniButtons">
                                        <IconButton color="primary" aria-label="upload picture" component="label">
                                            <ThumbDownOffAlt />
                                        </IconButton>
                                        <p>{singleHighlightData ?0:''}</p>
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
                    <div className="fun__highlightVideoDetails">
                        {
                            singleHighlightData && singleHighlightData.videoDesc ? singleHighlightData.videoDesc: 
                                <p></p>
                        }
                        
                    </div>
                </div>
                <div className="fun__highlightsVideoBox">
                    <FunSearchBar handleSearch={HandleSearch}/>
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