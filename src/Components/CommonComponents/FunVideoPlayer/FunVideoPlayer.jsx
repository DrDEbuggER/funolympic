import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import ReactPlayer from 'react-player'
import { useParams } from 'react-router-dom'
import { firestore } from '../../../firebase'
import "./FunVideoPlayer.css"
export const FunVideoPlayer = ({url, type, width, height, control}) => {
    const playerRef = useRef()
    // const [oldTime, setOldTime] = useState(0)
    const {videoID} = useParams()
    const oldTime = useRef(0)
    
    const UpdateWatchCount = async(videoID, watchTime) => {
        const queryRef =  query(collection(firestore, `watchCount`), where("videoID", "==", videoID))
        const colRef = collection(firestore, `watchCount`)

        await getDocs(queryRef).then((res)=>{
            // converting to second
            let newTime = watchTime - oldTime.current;
            
            // watchTimeInServer /= 60;
            if(res.docs && res.docs[0]) {   
                let watchTimeInServer = Math.round(res.docs[0].data().watchTime);
                watchTimeInServer += newTime;
                const docRef = doc(firestore, "watchCount", res.docs[0].id)
                updateDoc(docRef, {
                    watchTime: Math.round(watchTimeInServer)
                }).then((res)=>{
                }, (err)=>console.log(err))
            }else {
                addDoc(colRef, {
                    videoID: videoID,
                    watchTime: Math.round(watchTime)
                })
            }
        })
        oldTime.current = watchTime;
    }
    

    useEffect(()=>{
        // if(type != "live") 
        //     return
        const calculateWatchTime = setInterval(() => {
            UpdateWatchCount(videoID, playerRef.current.getCurrentTime())
        }, 10000);
        return ()=> clearInterval(calculateWatchTime)
    },[])
    // console.log("prog", ReactPlayer.getSecondsLoaded())
    return (
        <div className='player-wrapper'>
            <ReactPlayer
              className='react-player'
              url={url}
              width={width}
              ref={playerRef}
              height={height}
              controls={control? control : false}
              onEnded={()=> oldTime.current = 0}
              onSeek={()=> oldTime.current = playerRef.current.getCurrentTime() }
            //   onPlay={()=> pauseRef.current = false}
            //   onPause={()=> pauseRef.current = true}
            />
        </div>
    )
    
}
