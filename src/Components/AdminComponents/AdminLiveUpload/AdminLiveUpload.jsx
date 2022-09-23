

import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useRef } from 'react';
import { useState } from 'react';
import { FunLightButton, FunProgressBar, FunSelectComponent, FunVideoPlayer } from '../../CommonComponents';
import "./AdminLiveUpload.css"
import { fireStorage, firestore } from '../../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { v4 as uuid} from "uuid"
export const AdminLiveUpload = () => {
    const [uploadFile, setUploadFile] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [uploadVideoTitle, setUploadVideoTitle] = useState('');
    const [uploadVideoDesc, setUploadVideoDesc] = useState('');
    const [uploadStreamURL, setUploadStreamURL] = useState('');
    const [uploadVideoEvent, setUploadVideoEvent] = useState('none');
    const [uploadVideoCategory, setUploadVideoCategory] = useState('none');
    const uploadFileObject = useRef()
    const uploadURL = useRef();
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

    const CleanUpStates = (uploadPercentage) => {
        setUploadPercentage(uploadPercentage);
        setUploadVideoEvent("none");
        setUploadVideoCategory("none");
        setUploadVideoTitle("");
        setUploadVideoDesc("");
        setUploadFile("")
        uploadFileObject.current = ""
        uploadURL.current = ""
    }

    const UploadVideo = (e) => {
        e.preventDefault()
        if (uploadStreamURL && 
                uploadVideoDesc && 
                uploadVideoTitle && 
                uploadVideoEvent && uploadVideoEvent !== "none" &&
                uploadVideoCategory && uploadVideoCategory !== "none") {
            
                let tempGameData ={
                    videoID: uuid().split("-").at(-1),
                    videoURL: uploadStreamURL,
                    uploadedAt: serverTimestamp(),
                    videoTitle: uploadVideoTitle,
                    videoDesc: uploadVideoDesc,
                    eventType: uploadVideoEvent,
                    category: uploadVideoCategory,
                    thumbnail: "https://cdn.dmcl.biz/media/image/213212/o/Armand+Duplantis+GettyImages-1332111991.jpg"
                }
                const gameRef = collection(firestore, `livestream`);
                addDoc(gameRef,tempGameData).then(res => {
                    CleanUpStates(0);
                },(err)=> console.log(err))
        } else {
            console.log("upload Fail")
        }
    }


    return (
        <div className="vid__uploadContainer">
            <div className="vid__uploadMain">
                <div className="vid__uploadUpper">
                    {
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
                                {/* <FunVideoPlayer width="100%"
                                                height="100%" 
                                                url={uploadURL.current}
                                                /> */}
                                <img src={uploadURL.current}/>
                            </div>
                    }
                    
                    <div className='vid__uploadInfoLower'>
                        <p>{uploadFile}</p>
                        <label className='vid__uploadFileInfo' htmlFor="uploadFileInfo" onChange={SelectHighlightVideo}>
                            <input name="" type="file" id="uploadFileInfo" accept='image/*' hidden />
                            Select File
                        </label>
                    </div> 
                </div>
                <div className="vid__uploadLower">
                    <h3>Video Details</h3>
                    <form className="vid__uploadForm" onSubmit={UploadVideo}>
                        <div className="vid__uploadInput">
                            <label>Stream URL</label>
                            <input className='vid__uploadTitle' value={uploadStreamURL} onChange={(e)=>setUploadStreamURL(e.target.value)}></input>
                        </div>
                        <div className="vid__uploadInput">
                            <label>Title</label>
                            <input className='vid__uploadTitle' value={uploadVideoTitle} onChange={(e)=>setUploadVideoTitle(e.target.value)}></input>
                        </div>
                        <div className="vid__uploadInput">
                            <label>Description</label>
                            <textarea className='vid__uploadDesc' value={uploadVideoDesc} rows={6} onChange={(e)=>setUploadVideoDesc(e.target.value)}></textarea>
                        </div>
                        <div className="vid__uploadParted">
                            <FunSelectComponent label={`Events`} optData={AllEvents} defaultValue={uploadVideoEvent} handleOnChange={HandleEventChange}/>
                            <FunSelectComponent label={`Category`} className={`vid__uploadCategory`} defaultValue={uploadVideoCategory} optData={AllCategories} handleOnChange={HandleCategoryChange}/>
                        </div>
                        <div className='vid__uploadVideo'>
                            <FunLightButton btnLabel={"Upload"} btnType={`submit`}/>
                        </div>
                        <div className='vid__progressBar'>
                            {
                                uploadPercentage ? <FunProgressBar percentage={uploadPercentage}/> : ""
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}