
import { addDoc, collection, orderBy, query, limit, serverTimestamp } from "firebase/firestore"
import { useState } from "react"
import { firestore } from "../../../firebase"
import { auth } from "../../../firebase"
import { IconButton } from '@mui/material';
import {useCollectionData} from "react-firebase-hooks/firestore"
import SendIcon from '@mui/icons-material/Send';
import "./FunChatBox.css";
import { FunChatMessage } from "./FunChatMessage";
export const FunChatBox = ({game}) => {
    const [rmessage, setMessage] = useState("")
    const queryRef = collection(firestore, "livechat","Ju6NdmCCF23yOq8xSqbJ",game)
    const chatQuery = query(queryRef, orderBy("createdAt"), limit(30))
    const [chatMessages, loading] = useCollectionData(chatQuery);

    const sendMessage = (e) => {
        e.preventDefault();
        let tempMessage ={uid: auth.currentUser.uid, 
                            message: rmessage,
                            createdAt: serverTimestamp()}
        const messageRef = collection(firestore, "livechat","Ju6NdmCCF23yOq8xSqbJ", game);
        addDoc(messageRef,tempMessage).then(res => {
            console.log("sent res",res);
            setMessage("");
        })
    }

    return (
        <div className="fun__chatBoxContainer">
            <form onSubmit={sendMessage} className="fun__chatForm">
                <div className="fun__chatHeader">
                    <h3>Live comments</h3>
                </div>
                <div className="fun__chatBody">
                    {!loading && chatMessages && chatMessages.map((cmt) => {
                        return <FunChatMessage comment={cmt.message}/>
                    })}

                    {/* <div className="fun__chatBodyMessage">
                        <div className="fun__messageContent">
                            <p>this is chat box</p>
                        </div>
                    </div>
                    <div className="fun__chatBodyMessage">
                        <div className="fun__messageContent">
                            <p>this is second chat box</p>
                        </div>
                    </div> */}
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