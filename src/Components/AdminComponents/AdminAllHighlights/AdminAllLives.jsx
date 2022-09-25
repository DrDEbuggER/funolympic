import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { firestore } from "../../../firebase"
import { FunVideoCardBox } from "../../CommonComponents"

import "./AdminAllHighlights.css"
export const AdminAllLives = ({docPath}) => {
    const [videoData, setVideoData] = useState([])
    // const womenGamesRef = collection(firestore, `/highlights`)
    const funNavigate = useNavigate()
    const QueryDocs = (setData, category) => {
        const queryRef = category ? query(collection(firestore, `${docPath}`), where("category", "==", category))
                                    : query(collection(firestore, `${docPath}`))
        let vData = [];
        onSnapshot(queryRef, (snap)=> {
            snap.docs.forEach((doc)=> {
                vData.push(doc.data())
            })
            setData(vData)
        })
        
    }
    useEffect(()=>{
        QueryDocs(setVideoData, "")
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
        FilterDocs(e.target.value, `${docPath}`, "")
    }

    const HandleEdit = (videoID) => {
        funNavigate(`/admin/live/update/${videoID}`)
    }

    const HandleDelete = () => {

    }

    return (
        <div className="fun__adminAllHighlightsContainer">
            <div className="fun__highlightSearch">
                <input type={"search"} onChange={HandleSearch}/>
            </div>
            <div className="fun__adminAllHighlights">
                <div className="fun__adminMenHighlights">
                    <p>All Lives</p>
                    <div className="fun__adminHighlightVideos">
                        {
                            videoData.map((vDat, idx) => {
                                return <FunVideoCardBox key={idx}
                                    videoID={vDat.videoID}
                                    thumbnail={vDat.thumbnail}
                                    vidTitle={vDat.videoTitle}
                                    vidEvent={vDat.eventType}
                                    category={vDat.category}
                                    onEditClick={HandleEdit}
                                    onDeleteClick={HandleDelete}
                                    />
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}