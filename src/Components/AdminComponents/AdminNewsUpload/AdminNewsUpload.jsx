import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { FunLightButton, FunProgressBar, FunSelectComponent } from '../../CommonComponents';
import "./AdminNewsUpload.css"
import { fireStorage, firestore } from '../../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, doc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { v4 as uuid} from "uuid"
export const AdminNewsUpload = ({className, videoData}) => {
    const [uploadFile, setUploadFile] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [uploadNewsTitle, setUploadNewsTitle] = useState('');
    const [uploadNewsDesc, setUploadNewsDesc] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [uploadNewsEvent, setUploadNewsEvent] = useState('none');
    const [uploadNewsCategory, setUploadNewsCategory] = useState('none');
    const [thumbnailURL, setThumbnailURL] = useState()
    const uploadFileObject = useRef()
    const uploadURL = useRef();
    const params = useParams()
    const funNav = useNavigate()

    useEffect(()=>{
        const InitData = async()=>{
            if (params.postID) {
                const docQuery = query(collection(firestore,'/news'), where("postID", "==", params.postID))
                await getDocs(docQuery).then((snap)=>{
                    setUploadNewsTitle(snap.docs[0].data().newsTitle)
                    setUploadNewsDesc(snap.docs[0].data().newsDesc)
                    setUploadNewsEvent(snap.docs[0].data().eventType)
                    setUploadNewsCategory(snap.docs[0].data().category)
                    setAuthorName(snap.docs[0].data().authorName)
                    setThumbnailURL(snap.docs[0].data().thumbnail)
                })
            } else {
                if (authorName) {
                    CleanUpStates(0)
                }
            }
        }
        InitData()
    },[params.postID])

    const AllEvents = [
        {
            optName: "None",
            ovtValue: "none"
        },
        {
            optName: "Football",
            optValue: "football"
        },
        {
            optName: "Swimming",
            optValue: "swimming"
        },
        {
            optName: "Archery",
            optValue: "archery"
        },
        {
            optName: "Basketball",
            optValue: "basketball"
        },
        {
            optName: "Sprinting",
            optValue: "sprinting"
        },
        {
            optName: "Weightlifting",
            optValue: "weightlifting"
        }
    ]

    const AllCategories = [
        {
            optName: "None",
            ovtValue: "none"
        },
        {
            optName: "Men",
            optValue: "men"
        },
        {
            optName: "Women",
            optValue: "women"
        }
    ]

    const SelectHighlightVideo = (e) => {
        if (e.target.files.length > 0) {
            setUploadFile(e.target.files[0].name)
            setUploadPercentage(0)
            uploadFileObject.current = e.target.files[0]
            uploadURL.current = URL.createObjectURL(uploadFileObject.current)
        } else {
            setUploadFile("")
            setUploadPercentage(0)
            uploadFileObject.current = ""
            uploadURL.current = ""
        }
    }

    const HandleEventChange = (e) => {
        setUploadNewsEvent(e.target.value)
    }
    
    const HandleCategoryChange = (e) => {
        setUploadNewsCategory(e.target.value)
    }

    const CleanUpStates = (uploadPercentage) => {
        setUploadPercentage(uploadPercentage);
        setUploadNewsEvent("none");
        setUploadNewsCategory("none");
        setUploadNewsTitle("");
        setUploadNewsDesc("");
        setUploadFile("")
	    setAuthorName("")
        uploadFileObject.current = ""
        uploadURL.current = ""
    }

    // Update and upload the post
    const UploadNews = async(e) => {
        e.preventDefault()
        if (
                uploadNewsDesc && 
                uploadNewsTitle && 
                uploadNewsEvent && uploadNewsEvent !== "none" &&
                uploadNewsCategory && uploadNewsCategory !== "none") {
            if (authorName && params.postID) {
                setUploadPercentage(0)
                let tempGameData ={
                    postID: params.postID,
                    authorName: authorName,
                    uploadedAt: serverTimestamp(),
                    newsTitle: uploadNewsTitle,
                    newsDesc: uploadNewsDesc,
                    eventType: uploadNewsEvent,
                    category: uploadNewsCategory,
                    thumbnail: thumbnailURL
                }
                const videoQuery = query(collection(firestore, "news"), where("postID", "==", params.postID))
                await getDocs(videoQuery).then(async(snap)=>{
                    let docID = snap.docs[0].id
                    const docRef = doc(firestore,`news`, docID)
                    await updateDoc(docRef, tempGameData).then((res)=> {setUploadPercentage(100)},
                    (err)=>console.log("update err", err))
                })
            }else {
                if (!uploadFileObject.current ) return;
                const fireStorageRef = ref(fireStorage, `/files/${uploadFileObject.current.name}`)
                const fireUploadTask = uploadBytesResumable(fireStorageRef, uploadFileObject.current)
                fireUploadTask.on("state_changed", (snapshot)=> {
                    const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                    setUploadPercentage(prog === 100 ? 99: prog)
                },
                (err)=>console.log(err),
                ()=>{
                    getDownloadURL(fireUploadTask.snapshot.ref)
                        .then(async(url) =>{
                            let tempGameData ={
                                postID: uuid().split("-").at(-1),
                                authorName: authorName,
                                uploadedAt: serverTimestamp(),
                                newsTitle: uploadNewsTitle,
                                newsDesc: uploadNewsDesc,
                                eventType: uploadNewsEvent,
                                category: uploadNewsCategory,
                                thumbnail: url
                            }
                            const gameRef = collection(firestore, `news`);
                            await addDoc(gameRef,tempGameData).then(res => {
                                CleanUpStates(100);
                            },(err)=> console.log(err))
                        })
                    }
                )
            }
        } else {
            //  upload fail handle
        }
    }

    return (
        <div className={`vid__uploadContainer ${className}`}>
            <div className="vid__uploadMain">
                <div className="vid__uploadUpper">
                    {
                        !params.postID ?
                            !uploadFileObject.current ?
                                <div className='vid__uploadUpperSec'>
                                    <div className='vid__roundKeyUpWrapper'>
                                        <div className="vid__roundedKeyUp">
                                            <FileUploadIcon sx={{width: 70, height: 70, color: "gray"}}/>
                                        </div> 
                                    </div>
                                    <div className='vid__uploadInfo'>
                                        <div className="vid__uploadNotes">
                                            <h3>Browser file to Upload</h3>
                                            <p>Select image from the PC for thumbnail</p>
                                        </div>
                                    </div>
                                </div> :
                                <div className='vid__uploadUpperSec vid__uploadPlayer'> 
                                    <img src={uploadURL.current} alt=''/>
                                </div>
                                :
                                <div className='vid__uploadUpperSec vid__uploadPlayer'> 
                                    {/* <FunVideoPlayer width="100%"
                                                    height="100%" 
                                                    url={authorName ? authorName : uploadURL.current}
                                                    /> */}
                                    <img src={thumbnailURL ? thumbnailURL : uploadURL.current} alt=''/>
                                </div>
                    }
                    <div className={`vid__uploadInfoLower ${params.postID ? 'vid__fixBack' : ''}`}>
                        <p>{uploadFile}</p>
                        {
                            params.postID ? 
                                <label className='vid__uploadFileInfo' htmlFor="uploadFileInfo" onClick={()=> funNav(`/admin/news/all`)}>
                                    {/* <input name="" type="file" id="uploadFileInfo" accept='video/*' hidden /> */}
                                    Back
                                </label>
                            :
                                <label className='vid__uploadFileInfo' htmlFor="uploadFileInfo" onChange={SelectHighlightVideo}>
                                    <input name="" type="file" id="uploadFileInfo" accept='image/*' hidden />
                                    Select Image
                                </label>
                        }
                        
                    </div> 
                </div>
                <div className="vid__uploadLower">
                    <h3>News Post</h3>
                    <form className="vid__uploadForm" onSubmit={UploadNews}>
                        <div className="vid__uploadInput">
                            <label>News Title</label>
                            <input className='vid__uploadTitle' onChange={(e)=>setUploadNewsTitle(e.target.value) } value={uploadNewsTitle} required></input>
                        </div>
                        <div className="vid__uploadInput">
                            <label>News Content</label>
                            <textarea className='vid__uploadDesc'  rows={6} onChange={(e)=>setUploadNewsDesc(e.target.value)} value={uploadNewsDesc} required></textarea>
                        </div>
                        <div className="vid__uploadInput">
                            <label>Author</label>
                            <input className='vid__uploadTitle' value={authorName} onChange={(e)=>setAuthorName(e.target.value)} required></input>
                        </div>
                        <div className="vid__uploadParted">
                            <FunSelectComponent label={`Events`} optData={AllEvents}  handleOnChange={HandleEventChange} defaultValue={uploadNewsEvent}/>
                            <FunSelectComponent label={`Category`} className={`vid__uploadCategory`}  optData={AllCategories} handleOnChange={HandleCategoryChange} defaultValue={uploadNewsCategory}/>
                        </div>
                        <div className='vid__uploadNews'>
                            <FunLightButton btnLabel={`${params.postID? 'Update':'Post'}`} btnType={`submit`}/>
                        </div>
                        <div className='vid__progressBar'>
                            {
                                uploadPercentage ? <FunProgressBar percentage={uploadPercentage} isUpdated={params.postID ? true : false}/> : "" 
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}