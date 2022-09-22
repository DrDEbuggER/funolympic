
import { IconButton } from "@mui/material"
import { FunLandscapeCardBox, FunSearchBar, FunVideoPlayer } from "../../CommonComponents"
import { FunChatBox } from "../FunChatBox"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import "./FunNews.css"
import ads from "../../../assets/images/ads.svg"
import ShareIcon from '@mui/icons-material/Share';
import { ThumbDownAlt, ThumbDownOffAlt, ThumbUpOffAlt } from "@mui/icons-material";
import { useEffect } from "react";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useState } from "react";
import { firestore } from "../../../firebase";
import { useNavigate, useParams } from "react-router-dom";
export const FunNews = () => {
    const [highlightData, setHighlightData] = useState()
    const [singleHighlightData, setSingleHighlightData] = useState()
    const funNavigate = useNavigate()
    const {postID} = useParams()
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

    const QueryByPostID = (setData, postID) => {
        const queryRef =  query(collection(firestore, `/highlights`), where("highlightID", "==", postID))
        onSnapshot(queryRef, (snap)=> {
            setData(snap.docs[0].data())
        })
    }

    useEffect(()=>{
        if(postID) {
            QueryByPostID(setSingleHighlightData, postID)
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
        funNavigate(`/news/post/${postID}`)
    }


    return (
        <div className="fun__highlightsMain">
            <div className="fun__highlightsMainWrapper">
                <div className="fun__highlightsLiveWatch">
                    {/* <FunVideoPlayer width="100%" height="100%" url={singleHighlightData && singleHighlightData.videoURL? singleHighlightData.videoURL: `https://www.youtube.com/watch?v=jzJW0gTYB9k`}/> */}
                    <div className="fun__newsPromo">
                       <img src={
                            singleHighlightData && singleHighlightData.thumbnail ? singleHighlightData.thumbnail:
                                "https://library.sportingnews.com/styles/crop_style_16_9_desktop/s3/2021-12/matty-beniers-12242021-getty-ftr_16bcbkcczzgcw1luoakxdbzw4w.png"
                            
                        }></img>
                    </div>
                    <div className="fun__videoDesc">
                        <div className="fun__videoDescHead">
                            <h2> {singleHighlightData && singleHighlightData.videoTitle ? singleHighlightData.videoTitle: "Usain Bolt Wins FunOlympics 100m Gold! Bayjing 2022 | FunOlympic Games"} </h2>
                            <div className="fun__videoStatus">
                                <div className="fun__videoViews">
                                    <p>{`12 views - ${singleHighlightData && singleHighlightData.eventType ? singleHighlightData.eventType: "Football"} Live`}</p>
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
                    <div className="fun__highlightVideoDetails">
                        {
                            singleHighlightData && singleHighlightData.videoDesc ? singleHighlightData.videoDesc: 
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus vestibulum sed arcu non odio. Eu nisl nunc mi ipsum faucibus vitae aliquet. Dui id ornare arcu odio ut sem nulla pharetra diam. Donec ac odio tempor orci. Neque convallis a cras semper auctor neque vitae tempus. Urna molestie at elementum eu facilisis sed. Proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo. Amet justo donec enim diam. Interdum posuere lorem ipsum dolor sit amet consectetur. Maecenas volutpat blandit aliquam etiam erat velit. Id porta nibh venenatis cras sed felis eget velit aliquet. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Luctus accumsan tortor posuere ac ut consequat semper.</p>
                        }
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus vestibulum sed arcu non odio. Eu nisl nunc mi ipsum faucibus vitae aliquet. Dui id ornare arcu odio ut sem nulla pharetra diam. Donec ac odio tempor orci. Neque convallis a cras semper auctor neque vitae tempus. Urna molestie at elementum eu facilisis sed. Proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo. Amet justo donec enim diam. Interdum posuere lorem ipsum dolor sit amet consectetur. Maecenas volutpat blandit aliquam etiam erat velit. Id porta nibh venenatis cras sed felis eget velit aliquet. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Luctus accumsan tortor posuere ac ut consequat semper.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus vestibulum sed arcu non odio. Eu nisl nunc mi ipsum faucibus vitae aliquet. Dui id ornare arcu odio ut sem nulla pharetra diam. Donec ac odio tempor orci. Neque convallis a cras semper auctor neque vitae tempus. Urna molestie at elementum eu facilisis sed. Proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo. Amet justo donec enim diam. Interdum posuere lorem ipsum dolor sit amet consectetur. Maecenas volutpat blandit aliquam etiam erat velit. Id porta nibh venenatis cras sed felis eget velit aliquet. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Luctus accumsan tortor posuere ac ut consequat semper.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus vestibulum sed arcu non odio. Eu nisl nunc mi ipsum faucibus vitae aliquet. Dui id ornare arcu odio ut sem nulla pharetra diam. Donec ac odio tempor orci. Neque convallis a cras semper auctor neque vitae tempus. Urna molestie at elementum eu facilisis sed. Proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo. Amet justo donec enim diam. Interdum posuere lorem ipsum dolor sit amet consectetur. Maecenas volutpat blandit aliquam etiam erat velit. Id porta nibh venenatis cras sed felis eget velit aliquet. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Luctus accumsan tortor posuere ac ut consequat semper.</p>
                        
                    </div>
                </div>
                <div className="fun__highlightsVideoBox">
                    <FunSearchBar handleSearch={HandleSearch}/>
                    <div className="fun__highlightList">
                        {
                        highlightData && highlightData.map((vDat, idx) => {
                                return <FunLandscapeCardBox key={idx}
                                    imageURL={vDat.thumbnail}
                                    title={vDat.videoTitle}
                                    category={vDat.category}
                                    description={vDat.videoDesc}
                                    HandleClick={HandlePostClick}
                                    postID = {vDat.highlightID}
                                    />
                            })
                        }
                    </div>
                    
                </div>
            </div>
        </div>
    )
}