import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { FunLightButton, FunProgressBar, FunSelectComponent, FunVideoPlayer } from '../../CommonComponents';
import "./AdminHighlightUpload.css"
import { fireStorage, firestore } from '../../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, doc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { v4 as uuid} from "uuid"
export const AdminHighlightUpload = ({className, videoData}) => {
    const [uploadFile, setUploadFile] = useState('');
    const [uploadThumb, setUploadThumb] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [uploadVideoTitle, setUploadVideoTitle] = useState('');
    const [uploadVideoDesc, setUploadVideoDesc] = useState('');
    const [thumbURL, setThumbURL] = useState('')
    const [uploadVideoEvent, setUploadVideoEvent] = useState('none');
    const [uploadVideoCategory, setUploadVideoCategory] = useState('none');
    const [videoURL, setVideoURL] = useState()
    const uploadFileObject = useRef()
    const uploadThumbObject = useRef()
    const uploadURL = useRef();
    const params = useParams()
    const funNav = useNavigate()

    useEffect(()=>{
        const InitData = async() => {
            if (params.videoID) {
                const docQuery = query(collection(firestore,'/highlights'), where("videoID", "==", params.videoID))
                await getDocs(docQuery).then((snap)=>{
                    setUploadVideoTitle(snap.docs[0].data().videoTitle)
                    setUploadVideoDesc(snap.docs[0].data().videoDesc)
                    setUploadVideoEvent(snap.docs[0].data().eventType)
                    setUploadVideoCategory(snap.docs[0].data().category)
                    setThumbURL(snap.docs[0].data().thumbnail)
                    setVideoURL(snap.docs[0].data().videoURL)
                })
            } else {
                if (videoURL) {
                    CleanUpStates(0)
                }
            }
        }
        InitData()
    },[params.videoID])

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

    const SelectThumbnail = (e) => {
        if (e.target.files.length > 0) {
            setUploadThumb(e.target.files[0].name)
            setUploadPercentage(0)
            uploadThumbObject.current = e.target.files[0]
        } else {
            setUploadFile("")
            setUploadPercentage(0)
            uploadThumbObject.current = ""
        }
    }

    const HandleEventChange = (e) => {
        setUploadVideoEvent(e.target.value)
    }
    
    const HandleCategoryChange = (e) => {
        setUploadVideoCategory(e.target.value)
    }

    const CleanUpStates = (uploadPercentage) => {
        setUploadPercentage(uploadPercentage);
        setUploadVideoEvent("none");
        setUploadVideoCategory("none");
        setUploadVideoTitle("");
        setUploadVideoDesc("");
        setUploadFile("")
        setUploadThumb("")
        setVideoURL("")
        setThumbURL("")
        uploadFileObject.current = ""
        uploadThumbObject.current = ""
        uploadURL.current = ""
    }

    const UploadVideo = async(e) => {
        e.preventDefault()
        if (
                uploadVideoDesc && 
                uploadVideoTitle && 
                uploadVideoEvent && uploadVideoEvent !== "none" &&
                uploadVideoCategory && uploadVideoCategory !== "none") {
            if (videoURL && params.videoID) {
                if (uploadThumbObject.current) {
                    const fireStorageRef = ref(fireStorage, `/files/${uploadThumbObject.current.name}`)
                    const fireUploadTask = uploadBytesResumable(fireStorageRef, uploadThumbObject.current)
                    fireUploadTask.on("state_changed", (snapshot)=> {
                        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                        setUploadPercentage(prog === 100 ? 99: prog)
                    },
                    (err)=>console.log(err),
                    ()=>{
                        getDownloadURL(fireUploadTask.snapshot.ref)
                            .then(async (url) =>{
                                let tempGameData ={
                                    videoID: params.videoID,
                                    videoURL: videoURL,
                                    uploadedAt: serverTimestamp(),
                                    videoTitle: uploadVideoTitle,
                                    videoDesc: uploadVideoDesc,
                                    eventType: uploadVideoEvent,
                                    category: uploadVideoCategory,
                                    thumbnail: url
                                    
                                }
                                const videoQuery = query(collection(firestore, "highlights"), where("videoID", "==", params.videoID))
                                await getDocs(videoQuery).then(async(snap)=>{
                                    let docID = snap.docs[0].id
                                    const docRef = doc(firestore,`highlights`, docID)
                                    await updateDoc(docRef, tempGameData).then((res)=> {
                                        setUploadPercentage(100)
                                        setThumbURL(url)
                                    },
                                    (err)=>console.log("update err", err))
                                })
                             }
                            )
                        }
                    )
                } else if(thumbURL) {
                    setUploadPercentage(0)
                    let tempGameData ={
                        videoID: params.videoID,
                        videoURL: videoURL,
                        uploadedAt: serverTimestamp(),
                        videoTitle: uploadVideoTitle,
                        videoDesc: uploadVideoDesc,
                        eventType: uploadVideoEvent,
                        category: uploadVideoCategory,
                        thumbnail: thumbURL
                    }
                    const videoQuery = query(collection(firestore, "highlights"), where("videoID", "==", params.videoID))
                    await getDocs(videoQuery).then(async(snap)=>{
                        let docID = snap.docs[0].id
                        const docRef = doc(firestore,`highlights`, docID)
                        await updateDoc(docRef, tempGameData).then((res)=> {setUploadPercentage(100)},
                        (err)=>console.log("update err", err))
                    })
                } else {
                    // thumbnail not found handle
                }
            }else {
                if (!uploadFileObject.current ) return;
                const fireStorageRef = ref(fireStorage, `/files/${uploadFileObject.current.name}`)
                const fireUploadTask = uploadBytesResumable(fireStorageRef, uploadFileObject.current)
                fireUploadTask.on("state_changed", (snapshot)=> {
                    const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                    setUploadPercentage(prog === 100 ? 99: prog)
                    // console.log("prog", prog)
                },
                (err)=>console.log(err),
                ()=>{
                    getDownloadURL(fireUploadTask.snapshot.ref)
                        .then(url =>{
                            const fireThumbStorageRef = ref(fireStorage, `/thumb/${uploadThumbObject.current.name}`)
                            const fireThumbUploadTask = uploadBytesResumable(fireThumbStorageRef, uploadThumbObject.current)
                            fireThumbUploadTask.on("state_changed", (snapshot) =>{
                            }, (err)=> console.log("thumb err", err),
                            ()=>{
                                getDownloadURL(fireThumbUploadTask.snapshot.ref)
                                .then(async(thumbURL) => {
                                    let tempGameData ={
                                        videoID: uuid().split("-").at(-1),
                                        videoURL: url,
                                        uploadedAt: serverTimestamp(),
                                        videoTitle: uploadVideoTitle,
                                        videoDesc: uploadVideoDesc,
                                        eventType: uploadVideoEvent,
                                        category: uploadVideoCategory,
                                        thumbnail: thumbURL,
                                        likeCount: 0,
                                        dislikeCount: 0
                                    }
                                    const gameRef = collection(firestore, `highlights`);
                                    await addDoc(gameRef,tempGameData).then(res => {
                                        CleanUpStates(100);
                                    },(err)=> console.log(err))
                                })
                            })
                            
                        })
                    }
                )
            }
        } else {
            // Upload Fail Error
        }
    }



    return (
        <div className={`vid__uploadContainer ${className}`}>
            <div className="vid__uploadMain">
                <div className="vid__uploadUpper">
                    {
                        !videoURL ?
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
                                            <p>Select highlights video from the PC to upload.</p>
                                        </div>
                                    </div>
                                </div> :
                                <div className='vid__uploadUpperSec vid__uploadPlayer'> 
                                    <FunVideoPlayer width="100%"
                                                    height="100%" 
                                                    url={videoURL ? videoURL : uploadURL.current}
                                                    // thumb={thumbURL}
                                                    control={true}
                                                    />
                                </div>
                                :
                                <div className='vid__uploadUpperSec vid__uploadPlayer'> 
                                    <FunVideoPlayer width="100%"
                                                    height="100%" 
                                                    url={videoURL ? videoURL : uploadURL.current}
                                                    control={true}
                                                    // thumb={thumbURL}
                                                    />
                                </div>
                    }
                    <div className={`vid__uploadInfoLower ${videoURL ? 'vid__fixBack' : ''}`}>
                        <p>{uploadFile}</p>
                        {
                            videoURL ? 
                                <label className='vid__uploadFileInfo' htmlFor="uploadFileInfo" onClick={()=> funNav(`/admin/highlights/all`)}>
                                    {/* <input name="" type="file" id="uploadFileInfo" accept='video/*' hidden /> */}
                                    Back
                                </label>
                            :
                                <label className='vid__uploadFileInfo' htmlFor="uploadFileInfo" onChange={SelectHighlightVideo}>
                                    <input name="" type="file" id="uploadFileInfo" accept='video/*' hidden />
                                    Select File
                                </label>
                        }
                        
                    </div> 
                </div>
                <div className="vid__uploadLower">
                    <h3>Video Details</h3>
                    <form className="vid__uploadForm" onSubmit={UploadVideo}>
                        <div className="vid__uploadInput">
                            <label>Title</label>
                            <input className='vid__uploadTitle' onChange={(e)=>setUploadVideoTitle(e.target.value) } value={uploadVideoTitle} required></input>
                        </div>
                        <div className="vid__uploadInput">
                            <label>Description</label>
                            <textarea className='vid__uploadDesc'  rows={6} onChange={(e)=>setUploadVideoDesc(e.target.value)} value={uploadVideoDesc} required></textarea>
                        </div>
                        <div className="vid__uploadParted">
                            <FunSelectComponent label={`Events`} optData={AllEvents}  handleOnChange={HandleEventChange} defaultValue={uploadVideoEvent}/>
                            <FunSelectComponent label={`Category`} className={`vid__uploadCategory`}  optData={AllCategories} handleOnChange={HandleCategoryChange} defaultValue={uploadVideoCategory}/>
                        </div>
                        <div className='vid__uploadThumbnail'>
                            <label className='vid__uploadFileInfo vid__uploadInfoFix' htmlFor="uploadThumbInfo" onChange={SelectThumbnail}>
                                        <input name="" type="file" id="uploadThumbInfo" accept='image/*' hidden />
                                        Select Thumbnail
                            </label>
                            <p>{uploadThumb}</p>
                        </div>
                        
                        <div className='vid__uploadVideo'>
                            <FunLightButton btnLabel={`${videoURL? 'Update':'Upload'}`} btnType={`submit`}/>
                        </div>
                        <div className='vid__progressBar'>
                            {
                                uploadPercentage ? <FunProgressBar percentage={uploadPercentage} isUpdated={videoURL ? true : false}/> : "" 
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}