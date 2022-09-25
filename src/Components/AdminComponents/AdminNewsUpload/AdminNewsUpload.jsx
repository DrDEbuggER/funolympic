import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { FunLightButton, FunProgressBar, FunSelectComponent, FunVideoPlayer } from '../../CommonComponents';
import "./AdminNewsUpload.css"
import { fireStorage, firestore } from '../../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { v4 as uuid} from "uuid"
export const AdminNewsUpload = ({className, videoData}) => {
    const [uploadFile, setUploadFile] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [uploadVideoTitle, setUploadVideoTitle] = useState('');
    const [uploadVideoDesc, setUploadVideoDesc] = useState('');
    const [uploadStreamURL, setUploadStreamURL] = useState('');
    const [uploadVideoEvent, setUploadVideoEvent] = useState('none');
    const [uploadVideoCategory, setUploadVideoCategory] = useState('none');
    const [thumbnailURL, setThumbnailURL] = useState()
    const [channel, setChannel] = useState("none")
    const uploadFileObject = useRef()
    const uploadURL = useRef();
    const params = useParams()
    const funNav = useNavigate()

    useEffect(()=>{
        console.log("params", params.videoID)
        if (params.videoID) {
            const docQuery = query(collection(firestore,'/lives'), where("videoID", "==", params.videoID))
            getDocs(docQuery).then((snap)=>{
                console.log("snap",snap.docs[0].data())
                setUploadVideoTitle(snap.docs[0].data().videoTitle)
                setUploadVideoDesc(snap.docs[0].data().videoDesc)
                setUploadVideoEvent(snap.docs[0].data().eventType)
                setUploadVideoCategory(snap.docs[0].data().category)
                setUploadStreamURL(snap.docs[0].data().videoURL)
                setThumbnailURL(snap.docs[0].data().thumbnail)
            })
        } else {
            if (uploadStreamURL) {
                CleanUpStates(0)
            }
        }
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
        }
    ]
    const Channels = [
        {
            optName: "None",
            ovtValue: "none"
        },
        {
            optName: "Sky Sport",
            optValue: "skysport"
        },
        {
            optName: "Dazn",
            optValue: "dazn"
        },
        {
            optName: "Star Sports Select 2",
            optValue: "sss2"
        },
        {
            optName: "Star Sports 2",
            optValue: "ss2"
        },
        {
            optName: "ESPN",
            optValue: "espn"
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
        console.log(e)
        if (e.target.files.length > 0) {
            setUploadFile(e.target.files[0].name)
            setUploadPercentage(0)
            uploadFileObject.current = e.target.files[0]
            uploadURL.current = URL.createObjectURL(uploadFileObject.current)
        } else {
            console.log("cleared")
            setUploadFile("")
            setUploadPercentage(0)
            uploadFileObject.current = ""
            uploadURL.current = ""
        }
    }

    const HandleEventChange = (e) => {
        setUploadVideoEvent(e.target.value)
    }
    
    const HandleCategoryChange = (e) => {
        setUploadVideoCategory(e.target.value)
    }

    const HandleChannelChange = (e) => {
        setChannel(e.target.value)
    }

    const CleanUpStates = (uploadPercentage) => {
        setUploadPercentage(uploadPercentage);
        setUploadVideoEvent("none");
        setUploadVideoCategory("none");
        setUploadVideoTitle("");
        setUploadVideoDesc("");
        setUploadFile("")
	    setUploadStreamURL("")
        uploadFileObject.current = ""
        uploadURL.current = ""
    }

    const UploadVideo = (e) => {
        e.preventDefault()
        console.log("event", uploadVideoEvent)
        console.log("cate", uploadVideoCategory)
        if (
                uploadVideoDesc && 
                uploadVideoTitle && 
                uploadVideoEvent && uploadVideoEvent !== "none" &&
                uploadVideoCategory && uploadVideoCategory !== "none") {
            if (uploadStreamURL && params.videoID) {
                setUploadPercentage(0)
                let tempGameData ={
                    videoID: params.videoID,
                    videoURL: uploadStreamURL,
                    uploadedAt: serverTimestamp(),
                    videoTitle: uploadVideoTitle,
                    videoDesc: uploadVideoDesc,
                    eventType: uploadVideoEvent,
                    category: uploadVideoCategory,
                    thumbnail: thumbnailURL
                }
                const videoQuery = query(collection(firestore, "lives"), where("videoID", "==", params.videoID))
                getDocs(videoQuery).then((snap)=>{
                    let docID = snap.docs[0].id
                    const docRef = doc(firestore,`lives`, docID)
                    updateDoc(docRef, tempGameData).then((res)=> {setUploadPercentage(100)},
                    (err)=>console.log("update err", err))
                })
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
                            let tempGameData ={
                                videoID: uuid().split("-").at(-1),
                                videoURL: uploadStreamURL,
                                uploadedAt: serverTimestamp(),
                                videoTitle: uploadVideoTitle,
                                videoDesc: uploadVideoDesc,
                                eventType: uploadVideoEvent,
                                category: uploadVideoCategory,
                                thumbnail: url
                            }
                            const gameRef = collection(firestore, `lives`);
                            addDoc(gameRef,tempGameData).then(res => {
                                CleanUpStates(100);
                            },(err)=> console.log(err))
                        })
                    }
                )
            }
        } else {
            console.log("upload Fail")
        }
    }

    return (
        <div className={`vid__uploadContainer ${className}`}>
            <div className="vid__uploadMain">
                <div className="vid__uploadUpper">
                    {
                        !uploadStreamURL ?
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
                                    <img src={uploadURL.current}/>
                                </div>
                                :
                                <div className='vid__uploadUpperSec vid__uploadPlayer'> 
                                    {/* <FunVideoPlayer width="100%"
                                                    height="100%" 
                                                    url={uploadStreamURL ? uploadStreamURL : uploadURL.current}
                                                    /> */}
                                    <img src={thumbnailURL ? thumbnailURL : uploadURL.current} />
                                </div>
                    }
                    <div className={`vid__uploadInfoLower ${uploadStreamURL ? 'vid__fixBack' : ''}`}>
                        <p>{uploadFile}</p>
                        {
                            uploadStreamURL ? 
                                <label className='vid__uploadFileInfo' htmlFor="uploadFileInfo" onClick={()=> funNav(`/admin/live/all`)}>
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
                    <h3>Live Details</h3>
                    <form className="vid__uploadForm" onSubmit={UploadVideo}>
				        <div className="vid__uploadInput">
                            <label>Stream URL</label>
                            <input className='vid__uploadTitle' value={uploadStreamURL} onChange={(e)=>setUploadStreamURL(e.target.value)} required></input>
                        </div>
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
                            <FunSelectComponent label={`Broadcast Channels`} optData={Channels}  handleOnChange={HandleChannelChange} defaultValue={channel}/>
                        </div>
                        <div className='vid__uploadVideo'>
                            <FunLightButton btnLabel={`${uploadStreamURL? 'Update':'Upload'}`} btnType={`submit`}/>
                        </div>
                        <div className='vid__progressBar'>
                            {
                                uploadPercentage ? <FunProgressBar percentage={uploadPercentage} isUpdated={uploadStreamURL ? true : false}/> : "" 
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}