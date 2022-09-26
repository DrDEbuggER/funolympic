import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { auth, firestore } from "../../../firebase";
import { FunUserAuth } from "../../../FunContext";


export const FunLogout = () => {
    const {funLogout} = FunUserAuth();
    const {logout} = FunUserAuth();

    // console.log("why logout")
        // const userRef = query(collection(firestore, "users"), where("uuid", "==", auth.currentUser.uid))
        // await getDocs(userRef).then(async (snap) => {
        //     await updateDoc(doc(firestore, `users/${snap.docs[0].id}`), {online:false}).then(async(res)=> {
                
        //     })
        // })

    useEffect(()=>{
        console.log("funlogout hit")
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
        Logout()
        
    },[])
    return (
        <div>
        </div>
    )
}