import { Circle, CircleOutlined, Fullscreen, FullscreenExit, PlayArrow, Square, SquareOutlined } from '@mui/icons-material'
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { findDOMNode } from 'react-dom'
import ReactPlayer from 'react-player'
import { useParams } from 'react-router-dom'
import { firestore } from '../../../firebase'
import "./FunVideoPlayer.css"
import "./hidecontrols.css"
export const FunVideoPlayer = ({url, type, isLive, width, height, control, isPlayable, thumb}) => {
    const playerRef = useRef()
    const divRef = useRef()
    // const [oldTime, setOldTime] = useState(0)
    const {videoID} = useParams()
    const oldTime = useRef(0)
    const [showControls, setShowControls] = useState(false)
    const [isFullScreen, setIsFullScreen] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)


    const HandleMouseEnter = (e) => {
        setTimeout(()=>{
            setShowControls(true)
        },300)
    }
    
    const HandleMouseExit = (e) => {
        setTimeout(()=>{
            setShowControls(true)
        },300)
    }

    const UpdateWatchCount = async(videoID, watchTime) => {
        if(videoID) {
            const queryRef =  query(collection(firestore, `watchCount`), where("videoID", "==", videoID))
            const colRef = collection(firestore, `watchCount`)
    
            await getDocs(queryRef).then(async(res)=>{
                // converting to second
                let newTime = watchTime - oldTime.current;
                // watchTimeInServer /= 60;
                if(res.docs && res.docs[0]) {   
                    let watchTimeInServer = Math.round(res.docs[0].data().watchTime);
                    watchTimeInServer += newTime;
                    const docRef = doc(firestore, "watchCount", res.docs[0].id)
                    await updateDoc(docRef, {
                        watchTime: Math.round(watchTimeInServer)
                    }).then((res)=>{
                    }, (err)=>console.log(err))
                }else {
                    await addDoc(colRef, {
                        videoID: videoID,
                        watchTime: Math.round(watchTime)
                    })
                }
                oldTime.current = watchTime;
            })
        }
    }
    
    const HandleFullScreen = (e) => {
        // findDOMNode(divRef.current).requestFullscreen().catch(
        //     (err)=>{console.log("err fullscreen", err)}
        // )
        if(!isFullScreen) {
            findDOMNode(divRef.current).requestFullscreen().then((res)=>{
                setIsFullScreen(true)
            }, (err)=>{console.log(err)})
        } else {
            setIsFullScreen(false)
            document.exitFullscreen()
        }
        
    }

    const HandlePlaying = (e) => {
        console.log(playerRef.current)
        if (playerRef.current.getInternalPlayer().paused) {
            playerRef.current.getInternalPlayer().play()
            setIsPlaying(true)
        }else {
            playerRef.current.getInternalPlayer().pause()
            setIsPlaying(false)
        }
        
        console.log("paused", playerRef.current.getInternalPlayer().paused)
    }

    const HandleVideoStart = () => {
        setIsPlaying(true)
    }

    useEffect(()=>{
        // if(type != "live") 
        const calculateWatchTime = setInterval(() => {
            UpdateWatchCount(videoID, playerRef.current.getCurrentTime())
        }, 10000);
        return ()=> clearInterval(calculateWatchTime)
    },[])
    // console.log("prog", ReactPlayer.getSecondsLoaded())
    return (
        <div className='player-wrapper' ref={divRef} onMouseEnter={HandleMouseEnter} onMouseLeave={HandleMouseExit}>
            <ReactPlayer
              className={`react-player ${isLive?'live__player':''}`}
              url={url}
              width={width}
              ref={playerRef}
              config={{file: {attributes: {poster: `${thumb? thumb : ''}`}}}}
              height={height}
              playing={isPlayable}
              controls={control? control : false}
              onStart={HandleVideoStart}
              onEnded={()=> oldTime.current = 0}
              onSeek={()=> oldTime.current = playerRef.current.getCurrentTime() }
            />
            {   
                <div className={`fun__customControls ${isLive && showControls? 'show__controls' : 'hide__controls'}`}>
                   <div></div>
                   <div className='fun__customLiveButton'>
                        <div onClick={HandlePlaying}>
                            {
                                !isPlaying ?
                                    <PlayArrow sx={{width: 20, color: "white"}}/>
                                :
                                    <Square sx={{width: 20, color: "white"}} />
                            }
                            
                        </div>
                       
                        <div className='fun__customLiveLabel'>
                           <Circle sx={{width: 10, color: "red"}}/>
                           <p>Live</p>
                        </div>
                        <div className='fun__customFullScreen' onClick={HandleFullScreen}> 
                            {
                                isFullScreen ?
                                    <FullscreenExit sx={{color: "white"}}/>
                                    :
                                    <Fullscreen sx={{color: "white"}}/>
                            }
                            
                        </div>
                   </div>
                   
                </div>
            }
        </div>
    )
    
}
