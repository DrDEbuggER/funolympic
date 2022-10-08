
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
import { collection, getDocs, limitToLast, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useState } from "react";
import { firestore } from "../../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton } from "react-share";
export const FunNews = () => {
    const [newsData, setNewsData] = useState()
    const [singleNewsData, setSingleNewsData] = useState()
    const funNavigate = useNavigate()
    const {postID} = useParams()
    const QueryDocs = (setData, category) => {
        const queryRef = category == "none" ? query(collection(firestore, `/news`)) : query(collection(firestore, `/highlights`), where("category", "==", category))
        let nData = [];
        onSnapshot(queryRef, (snap)=> {
            snap.docs.forEach((doc)=> {
                nData.push(doc.data())
            })
            setData(nData)
        })
        
    }

    // Query news by news post id
    const QueryByPostID = (setData, postID) => {
        const queryRef =  query(collection(firestore, `/news`), where("postID", "==", postID))
        onSnapshot(queryRef, (snap)=> {
            setData(snap.docs[0].data())
        })
    }

     // Query Latest News
    const QueryLatestNews = async(setData, category) => {
        const queryRef = category == "none" ? query(collection(firestore, `/news`), orderBy("uploadedAt","asc"), limitToLast(1)) : query(collection(firestore, `/news`), where("category", "==", category))
        await getDocs(queryRef).then((snap)=>{
            setData(snap.docs[0].data())
            // console.log("snap", snap)
        })
    }

    useEffect(()=>{
        if(postID) {
            QueryByPostID(setSingleNewsData, postID)
        }else {
            QueryLatestNews(setSingleNewsData, "none")
        }
        QueryDocs(setNewsData, "none")
    },[postID])

    // filter news by keyword typed in search bar
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
                    return doc.newsTitle.toLowerCase().includes(keywords)
                }
            })
            setNewsData(tempData)
        }
    }

    // handle search
    const HandleSearch = async(e) => {
        e.preventDefault();
        // FilterDocs(e.target.value, "/highlights/men/Games", "swimming")
        FilterDocs(e.target.value, "/news", "")
    }

    const HandlePostClick = (postID) => {
        console.log(postID)
        funNavigate(`/news/post/${postID}`)
    }


    return (
        <div className="fun__highlightsMain">
            <div className="fun__highlightsMainWrapper">
                <div className="fun__highlightsLiveWatch">
                    {/* <FunVideoPlayer width="100%" height="100%" url={singleNewsData && singleNewsData.videoURL? singleNewsData.videoURL: `https://www.youtube.com/watch?v=jzJW0gTYB9k`}/> */}
                    <div className="fun__newsPromo">
                       <img src={
                            singleNewsData && singleNewsData.thumbnail ? singleNewsData.thumbnail:
                                ""
                            
                        }></img>
                    </div>
                    <div className="fun__videoDesc">
                        <div className="fun__videoDescHead">
                            <h2> {singleNewsData && singleNewsData.newsTitle ? singleNewsData.newsTitle: ""} </h2>
                            <div className="fun__videoStatus">
                                <div className="fun__videoViews">
                                    <p>{`Tag: ${singleNewsData && singleNewsData.eventType ? singleNewsData.eventType: ""},
                                        ${singleNewsData && singleNewsData.category ? singleNewsData.category: ""}`}</p>
                                </div>
                                <div className="fun__videoButtons">
                                    <div className="fun__miniButtons">
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
                    <div className="fun__highlightNewsDetails">
                        {
                            singleNewsData && singleNewsData.newsDesc ? singleNewsData.newsDesc: 
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus vestibulum sed arcu non odio. Eu nisl nunc mi ipsum faucibus vitae aliquet. Dui id ornare arcu odio ut sem nulla pharetra diam. Donec ac odio tempor orci. Neque convallis a cras semper auctor neque vitae tempus. Urna molestie at elementum eu facilisis sed. Proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo. Amet justo donec enim diam. Interdum posuere lorem ipsum dolor sit amet consectetur. Maecenas volutpat blandit aliquam etiam erat velit. Id porta nibh venenatis cras sed felis eget velit aliquet. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Luctus accumsan tortor posuere ac ut consequat semper.</p>
                        }
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus vestibulum sed arcu non odio. Eu nisl nunc mi ipsum faucibus vitae aliquet. Dui id ornare arcu odio ut sem nulla pharetra diam. Donec ac odio tempor orci. Neque convallis a cras semper auctor neque vitae tempus. Urna molestie at elementum eu facilisis sed. Proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo. Amet justo donec enim diam. Interdum posuere lorem ipsum dolor sit amet consectetur. Maecenas volutpat blandit aliquam etiam erat velit. Id porta nibh venenatis cras sed felis eget velit aliquet. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Luctus accumsan tortor posuere ac ut consequat semper.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus vestibulum sed arcu non odio. Eu nisl nunc mi ipsum faucibus vitae aliquet. Dui id ornare arcu odio ut sem nulla pharetra diam. Donec ac odio tempor orci. Neque convallis a cras semper auctor neque vitae tempus. Urna molestie at elementum eu facilisis sed. Proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo. Amet justo donec enim diam. Interdum posuere lorem ipsum dolor sit amet consectetur. Maecenas volutpat blandit aliquam etiam erat velit. Id porta nibh venenatis cras sed felis eget velit aliquet. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Luctus accumsan tortor posuere ac ut consequat semper.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus vestibulum sed arcu non odio. Eu nisl nunc mi ipsum faucibus vitae aliquet. Dui id ornare arcu odio ut sem nulla pharetra diam. Donec ac odio tempor orci. Neque convallis a cras semper auctor neque vitae tempus. Urna molestie at elementum eu facilisis sed. Proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo. Amet justo donec enim diam. Interdum posuere lorem ipsum dolor sit amet consectetur. Maecenas volutpat blandit aliquam etiam erat velit. Id porta nibh venenatis cras sed felis eget velit aliquet. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Luctus accumsan tortor posuere ac ut consequat semper.</p>
                        
                    </div>
                </div>
                <div className="fun__highlightsVideoBox">
                    <FunSearchBar placeholder={`Search News`} handleSearch={HandleSearch} className={`fix__searchWidth`}/>
                    <div className="fun__highlightList">
                        {
                        newsData && newsData.map((nDat, idx) => {
                                return <FunLandscapeCardBox key={idx}
                                    imageURL={nDat.thumbnail}
                                    title={nDat.newsTitle}
                                    category={nDat.category}
                                    description={nDat.newsDesc}
                                    HandleClick={HandlePostClick}
                                    postID = {nDat.postID}
                                    />
                            })
                        }
                    </div>
                    
                </div>
            </div>
        </div>
    )
}