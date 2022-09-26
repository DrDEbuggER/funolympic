
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { firestore } from "../../../firebase"
import { FunSearchBar } from "../../CommonComponents"
import { FunCardBox } from "../FunOlympicAtoms"
import { v4 as uuid} from "uuid"
import "./FunLiveGames.css"
import { useNavigate } from "react-router-dom"
export const FunLiveGames = () => {
    const funNavigate = useNavigate()
    const [liveVideoData, setLiveVideoData] = useState()
    const QueryDocs = (setData, category) => {
        const queryRef = category == "none" ? query(collection(firestore, `/lives`)) : query(collection(firestore, `/highlights`), where("category", "==", category))
        let vData = [];
        onSnapshot(queryRef, (snap)=> {
            snap.docs.forEach((doc)=> {
                vData.push(doc.data())
            })
            setData(vData)
        })
        
    }

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
            setLiveVideoData(tempData)
        }
    }

    const HandleSearch = async(e) => {
        e.preventDefault();
        // FilterDocs(e.target.value, "/highlights/men/Games", "swimming")
        FilterDocs(e.target.value, "/lives", "")
    }

    const HandleCardClick = (videoID) => {
        console.log("videoID",videoID)
        funNavigate(`/broadcast/watch/${videoID}`)

    }

    useEffect(()=>{
        console.log(" uuid ", uuid().split("-").at(-1))
        QueryDocs(setLiveVideoData, "none")
    },[])

    return (
        <div className="fun__broadcastLiveMain">
            <div className="fun__boradcastLiveHeader">
                <FunSearchBar placeholder={"Search Games"} handleSearch={HandleSearch}/>
            </div>
            <div className="fun__broadcastLiveMainWrapper">
                {
                    liveVideoData && liveVideoData.map((vDat, idx) => {
                            return <div className="fun__cardBox" key={idx}> 
                                        <FunCardBox 
                                            videoTitle={vDat.videoTitle}
                                            eventType={vDat.eventType}
                                            thumbnail={vDat.thumbnail}
                                            category={vDat.category}
                                            key={vDat.videoID}
                                            videoID={vDat.videoID}
                                            HandleClick={HandleCardClick}
                                        />
                                    </div>
                        })
                }
            </div>
        </div>
    )
}