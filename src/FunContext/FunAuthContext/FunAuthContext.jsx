import { createContext, useContext, useEffect, useState } from "react"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendEmailVerification
} from "firebase/auth"
import { auth, firestore } from "../../firebase";
import { addDoc, collection, doc, onSnapshot, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { useRef } from "react";

// creating user auth context
const FunUserAuthContext = createContext();


export const FunAuthContextProvider = ({children}) => {
    const [funUser, setfunUser] = useState();
    const [loading, setLoading] = useState(true);
    const [logout, setLogout] = useState(false);
    const [userType, setUserType] = useState("")
    const [error, setError] = useState("")
    // const userType = useRef()
    const funSignup = (fullName, userName, email, phone, country, pass) => {
        return createUserWithEmailAndPassword(auth, email, pass).then((funUserCred) => {
            console.log("fun User Cread:", funUserCred)
            let userObject = {
                fullName: fullName,
                userName: userName,
                email: email,
                phone: phone,
                country: country,
                status: "UnVerified",
                userType: "user",
                createdAt: serverTimestamp(),
                uuid: auth.currentUser.uid
            }
            // Add user data to firestore db
            const userRef = collection(firestore, `users`);
            addDoc(userRef, userObject).then((res) => {
                // added docs
            }, (err)=> console.log('user store err', err))

            // send verification request
            if (!funUserCred.user.emailVerified) {
                sendEmailVerification(auth.currentUser).then(()=> {
                    //Navigate
                })
            }
        });
    }

    const funLogin = (email, pass) => {
        return signInWithEmailAndPassword(auth, email, pass).then((funUser) => {
            if (!funUser.user.emailVerified) {
                console.log("Login: User not verified");
            }else {
                const userRef = query(collection(firestore, "users"), where("uuid", "==", auth.currentUser.uid))
                window.localStorage.setItem("login", "true")
                onSnapshot(userRef, (snapshot) => {
                    let docId = '';
                    snapshot.forEach(doc => {
                        docId = doc.id;
                    })
                    if (docId != '') {
                        updateDoc(doc(firestore, `users/${docId}`), {status: "Verified", online:true}).then((res)=> {
                            // Update Success
                        })
                    } 
                })
            }
        },(err)=>{
            setError(`Login Error: ${err.code.split("/")[1]}`)
        });
    }

    const funLogout = async () => {
        await auth.signOut().then((res)=> {
            console.log("res logout", res)
            window.localStorage.setItem("login", "false")
            setLogout(true)
        }, (err)=> console.log('logout err: ', err))
    }

    const GetCurrentUserType = () => {
        if(auth.currentUser) {
            console.log("console")
            const userQuery = query(collection(firestore, "users"), where("uuid", "==",  auth.currentUser.uid))
            onSnapshot(userQuery,(snap)=>{
                // setUserType(snap.docs[0].data().userType)
                setUserType(snap.docs[0].data().userType)
                // snap.forEach((doc)=> {
                //     setUserType(doc.data().userType)
                //     console.log("docs")
                // })
            })
        } else {
            // setUserType("none")
        }
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currfunUser) => {
            console.log("Users:", currfunUser)
            setLoading(false)
            setfunUser(currfunUser)
        })
        return () => {
            unsubscribe();
        }
    },[])
    return (
        <FunUserAuthContext.Provider value={{funSignup, funLogin, funLogout, GetCurrentUserType, funUser, loading, logout, userType, error}}>
            {children}
        </FunUserAuthContext.Provider>
    )
}

export const FunUserAuth =() => {
    return useContext(FunUserAuthContext)
}