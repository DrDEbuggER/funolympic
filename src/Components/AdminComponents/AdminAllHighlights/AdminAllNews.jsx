import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { firestore } from "../../../firebase"
import { FunVideoCardBox } from "../../CommonComponents"

import "./AdminAllHighlights.css"
export const AdminAllNews = ({docPath}) => {
    const [newsData, setNewsData] = useState([])
    // const womenGamesRef = collection(firestore, `/highlights`)
    const funNavigate = useNavigate()
    const QueryDocs = (setData, category) => {
        const queryRef = category ? query(collection(firestore, `${docPath}`), where("category", "==", category))
                                    : query(collection(firestore, `${docPath}`))
        let nData = [];
        onSnapshot(queryRef, (snap)=> {
            snap.docs.forEach((doc)=> {
                nData.push(doc.data())
            })
            setData(nData)
        })
        
    }
    useEffect(()=>{
        QueryDocs(setNewsData, "")
    },[])

    // filter news 
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

    // handle news search
    const HandleSearch = async(e) => {
        e.preventDefault();
        // FilterDocs(e.target.value, "/highlights/men/Games", "swimming")
        FilterDocs(e.target.value, `${docPath}`, "")
    }

    const HandleEdit = (postID) => {
        funNavigate(`/admin/news/update/${postID}`)
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
                    <p>All News</p>
                    <div className="fun__adminHighlightVideos">
                        {
                            newsData.map((nDat, idx) => {
                                return <FunVideoCardBox key={idx}
                                    videoID={nDat.postID}
                                    thumbnail={nDat.thumbnail}
                                    vidTitle={nDat.newsTitle}
                                    vidEvent={nDat.eventType}
                                    category={nDat.category}
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