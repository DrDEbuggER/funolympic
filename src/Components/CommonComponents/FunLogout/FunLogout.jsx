import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { auth, firestore } from "../../../firebase";
import { FunUserAuth } from "../../../FunContext";


export const FunLogout = () => {
    const {funLogout} = FunUserAuth();

    useEffect(()=>{
        const CleanUpStatus = async() => {
            const userRef = query(collection(firestore, "users"), where("uuid", "==", auth.currentUser.uid))
            await getDocs(userRef).then(async (snap) => {
                await updateDoc(doc(firestore, `users/${snap.docs[0].id}`), {online:false}).then(async(res)=> {
                    
                })
            })
        }
        const Logout = async() => {
            await funLogout()
        }
        CleanUpStatus()
        const logoutInterval = setInterval(()=>{
           Logout()
        },2000)
        return ()=>clearInterval(logoutInterval)
    },[])
    return (
        <div className="fun__changePasswordWrapper">
        <div className="fun__changePassword">
            <form className="vid__uploadForm" >
                <p>Logging out...</p>
            </form>
        </div>
    </div>
    )
}