import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { firestore } from "../../../firebase"
import { FunVideoCardBox } from "../../CommonComponents"

import "./AdminAllHighlights.css"
export const AdminAllHighlights = () => {
    const [videoData, setVideoData] = useState([])
    const [womenData, setWomenData] = useState([])
    // const womenGamesRef = collection(firestore, `/highlights`)

    const QueryDocs = (setData, category) => {
        const queryRef = query(collection(firestore, `/highlights`), where("category", "==", category))
        let vData = [];
        onSnapshot(queryRef, (snap)=> {
            snap.docs.forEach((doc)=> {
                vData.push(doc.data())
            })
            setData(vData)
        })
        
    }
    useEffect(()=>{
        QueryDocs(setVideoData, "men")
        QueryDocs(setWomenData, "women")
    },[])

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
            setVideoData(tempData)
        }
    }

    const HandleSearch = async(e) => {
        e.preventDefault();
        // FilterDocs(e.target.value, "/highlights/men/Games", "swimming")
        FilterDocs(e.target.value, "/highlights", "")
    }

    return (
        <div className="fun__adminAllHighlightsContainer">
            <div className="fun__highlightSearch">
                <input type={"search"} onChange={HandleSearch}/>
            </div>
            <div className="fun__adminAllHighlights">
                <div className="fun__adminMenHighlights">
                    <p>Men</p>
                    <div className="fun__adminHighlightVideos">
                        {
                            videoData.map((vDat, idx) => {
                                return <FunVideoCardBox key={idx}
                                    thumbnail={`https://www.techsmith.com/blog/wp-content/uploads/2019/06/YouTube-Thumbnail-Sizes.png`}
                                    vidTitle={vDat.videoTitle}
                                    vidEvent={vDat.eventType}
                                    />
                            })
                        }
                    </div>
                </div>
                <div className="fun__adminWomenHighlights">
                    <p>Women</p>
                    <div className="fun__adminHighlightVideos">
                        {
                            womenData.map((vDat, idx) => {
                                return <FunVideoCardBox key={idx}
                                    thumbnail={`https://www.techsmith.com/blog/wp-content/uploads/2019/06/YouTube-Thumbnail-Sizes.png`}
                                    vidTitle={vDat.videoTitle}
                                    vidEvent={vDat.eventType}
                                    />
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}