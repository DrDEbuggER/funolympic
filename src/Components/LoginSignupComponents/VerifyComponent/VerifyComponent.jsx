import { sendEmailVerification } from "firebase/auth"
import { collection, doc, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { auth, firestore } from "../../../firebase"
import { FunButton } from "../../CommonComponents"
import { FunBroadcastNavBar } from "../../FunLandingComponents"
import "./VerifyComponent.css"
export const VerifyComponent = () => {
    const funNavigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            sendEmailVerification(auth.currentUser)
        }catch(e) {
            console.log(e.message)
        }   
    }

    useEffect(()=> {
        let interval = setInterval(async() => {
            if (auth.currentUser.emailVerified) {
                const userRef = query(collection(firestore, "users"), where("uuid", "==", auth.currentUser.uid))
                onSnapshot(userRef, (snapshot) => {
                    let docId = '';
                    snapshot.forEach(doc => {
                        docId = doc.id;
                    })
                    if (docId != '') {
                        updateDoc(doc(firestore, `users/${docId}`), {status: "Verified", online:true}).then((res)=> {
                            clearInterval(interval);
                            funNavigate("/broadcast");
                        })
                    } 
                })
            }
            await auth.currentUser.reload();
            }, 2000);
        return () => {
            clearInterval(interval)
        }
    },[funNavigate])

    return (
        <>
            <FunBroadcastNavBar btnText="Logout" toPage="/"/>
            <div className="fun__verifyContainer">
                <div className="fun__formWrapper">
                    <form className="fun__form" onSubmit={handleSubmit}>
                        <h1>Verify Your Email</h1>
                        <p>Email verification link has been sent to you email. Please check your <strong>SPAM</strong> folder. If you haven't got any mail, please click on <strong>Resend</strong> button to get your email.</p>
                        <FunButton text={"Resend"} btnType="Submit"/>
                    </form>
                </div>
            </div>
        </>
    )
}