
import { addDoc, collection } from "firebase/firestore"
import { useState } from "react"
import { firestore } from "../../../firebase"
import { auth } from "../../../firebase"
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import "./FunChatBox.css";
export const FunChatBox = ({game}) => {
    const [rmessage, setMessage] = useState("")
    const sendMessage = (e) => {
        e.preventDefault();
        // const messageRef = collectionGroup(firestore, "football");
        // await getDocs(messageRef).then(res => {
        //     console.log("getDocs", res.docs)
        // });
        let tempMessage ={uid: auth.currentUser.uid, 
                            message: rmessage,
                            createdAt: new Date().toISOString()}
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
                    <div className="fun__chatBodyMessage">
                        <div className="fun__messageContent">
                            <p>this is chat box</p>
                        </div>
                    </div>
                    <div className="fun__chatBodyMessage">
                        <div className="fun__messageContent">
                            <p>this is second chat box</p>
                        </div>
                    </div>
                </div>
                <div className="fun__chatInput">
                    <input onChange={(e)=>{setMessage(e.target.value)}} value={rmessage}/>
                    <IconButton color="primary" aria-label="upload picture" component="label">
                        <input hidden accept="image/*" type="file" />
                        <SendIcon />
                    </IconButton>
                </div>
            </form>
        </div>
    )
}