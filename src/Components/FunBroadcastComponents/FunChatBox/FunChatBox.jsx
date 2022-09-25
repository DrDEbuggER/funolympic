
import { addDoc, collection, orderBy, query, limit, serverTimestamp, onSnapshot, where, limitToLast } from "firebase/firestore"
import { useRef, useState } from "react"
import { firestore } from "../../../firebase"
import { auth } from "../../../firebase"
import { IconButton } from '@mui/material';
import {useCollectionData} from "react-firebase-hooks/firestore"
import SendIcon from '@mui/icons-material/Send';
import "./FunChatBox.css";
import { FunChatMessage } from "./FunChatMessage";
import { useEffect } from "react";
import Filter from 'bad-words'
export const FunChatBox = ({game}) => {
    const [rmessage, setMessage] = useState("")
    const queryRef = collection(firestore, "livechat","Ju6NdmCCF23yOq8xSqbJ",game)
    const chatQuery = query(queryRef, orderBy("createdAt"), limitToLast(15))
    const [chatMessages, loading] = useCollectionData(chatQuery);
    const [userName, setUserName] = useState("")
    const fixScroll = useRef();
    const filter = new Filter();
    const sendMessage = (e) => {
        e.preventDefault();
        filter.addWords('shit', 'stupid')
        
        
        if(rmessage && userName) {
            console.log("top", filter.isProfane(rmessage))
            if (filter.isProfane(rmessage)) {
                console.log("filter","isprofane")
                const colRef = collection(firestore, "BadActivity")
                addDoc(colRef, {
                    badTitle: "Inappropriate Comment",
                    badMessage: `User @${userName} dropped inappropriate comment. "${rmessage}"`
                },(err)=>console.log("badmsg",err))
            }
            let tempMessage ={uid: auth.currentUser.uid, 
                userName: userName,
                message: filter.clean(rmessage),
                createdAt: serverTimestamp()}
            const messageRef = collection(firestore, "livechat","Ju6NdmCCF23yOq8xSqbJ", game);
            setMessage("");
            addDoc(messageRef,tempMessage).then(res => {
                // console.log("sent res",res);
            })
        }
        fixScroll.current.scrollIntoView({block:"center", behavior: 'smooth'})
    }

    const GetCurrentUser = () => {
        const userQuery = query(collection(firestore, "users"), where("uuid", "==", auth.currentUser.uid))
        onSnapshot(userQuery, (snap) => {
            setUserName(snap.docs[0].data().userName)
        })
    }


    useEffect(()=> {
        GetCurrentUser()
    },[])

    return (
        <div className="fun__chatBoxContainer">
            <form onSubmit={sendMessage} className="fun__chatForm">
                <div className="fun__chatHeader">
                    <h3>Live comments</h3>
                </div>
                <div className="fun__chatBody">
                    <div className="fun__chatBodyTop">
                        {!loading && chatMessages && chatMessages.map((cmt,idx) => {
                            return <FunChatMessage key={idx} comment={cmt.message} userName={cmt.userName} className={auth.currentUser.uid === cmt.uid ? "fun__currentUser" : ""}/>
                        })}
                    </div>
                    
                    {/* <div ref={fixScroll}></div> */}
                    <div style={{ float:"left", clear: "both" }}
                        ref={fixScroll}>
                    </div>
                </div>
                <div className="fun__chatInput">
                    <input onChange={(e)=>{setMessage(e.target.value)}} value={rmessage}/>
                    <IconButton color="primary" aria-label="upload picture" component="label" onClick={sendMessage}>
                        {/* <input hidden accept="image/*" type="file" /> */}
                        <SendIcon />
                    </IconButton>
                </div>
            </form>
        </div>
    )
}