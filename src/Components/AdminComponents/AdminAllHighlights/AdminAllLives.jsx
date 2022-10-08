import { collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { firestore } from "../../../firebase"
import { BackDrop, FunDelete, FunSearchBar, FunVideoCardBox } from "../../CommonComponents"

import "./AdminAllHighlights.css"
export const AdminAllLives = ({docPath}) => {
    const [videoData, setVideoData] = useState([])
    const [postID, showPostID] = useState('')
    const [showBackDrop, setShowBackDrop] = useState(false)
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
    },[postID])

    const FilterDocs = async(keywords, documentPath, eventType) => {
        const q = eventType ? query(collection(firestore, documentPath), where("eventType", "==", eventType)) : query(collection(firestore, documentPath))
        // const q = query(collection(firestore, documentPath))
        const snapQuery = await getDocs(q);
        let fireDocuments = []
        let tempData = []
        snapQuery.forEach((doc) => {
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

    const HandleDeleteClick = async(delID) => {
        if(delID) {
            const delFix = query(collection(firestore, "lives"), where("videoID", "==", delID))
            await getDocs(delFix).then(async(snap)=> {
                if (snap.docs.length > 0) {
                    await deleteDoc(doc(firestore, "lives", snap.docs[0].id)).then((res)=>{
                        QueryDocs(setVideoData, "")
                        setShowBackDrop(false)
                    })
                }
            })
        }
    }

    const CancelBtnClick = () => {
        setShowBackDrop(false)
    }

    const HandleBackDrop = () => {
        setShowBackDrop(false)
    }

    const HandleDelete = async(postID) => {
        if(postID) {
            showPostID(postID)
            setShowBackDrop(true)
        }
    }


    return (
        <div className="fun__adminAllHighlightsContainer">
            <BackDrop show={showBackDrop} 
                children={ 
                    <FunDelete 
                        cancelBtnClick={CancelBtnClick}
                        deleteBtnClick={HandleDeleteClick}
                        deleteID={postID}
                    />
                    }
                handleClick={HandleBackDrop} 
                />
            <div className="fun__highlightSearch">
                <FunSearchBar placeholder={"Search Lives"} handleSearch={HandleSearch}/>
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