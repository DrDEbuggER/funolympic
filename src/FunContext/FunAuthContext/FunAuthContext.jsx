import { createContext, useContext, useEffect, useState } from "react"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendEmailVerification
} from "firebase/auth"
import { auth, firestore } from "../../firebase";
import { addDoc, collection, doc, getDocs, onSnapshot, query, serverTimestamp, updateDoc, where } from "firebase/firestore";

// creating user auth context
const FunUserAuthContext = createContext();


export const FunAuthContextProvider = ({children}) => {
    const [funUser, setfunUser] = useState();
    const [loading, setLoading] = useState(true);
    const [logout, setLogout] = useState(false);
    const [userType, setUserType] = useState("")
    const [error, setError] = useState("")
    const [banned,setBanned] = useState(false)
    // const userType = useRef()
    const funSignup = async(fullName, userName, email, phone, country, pass) => {
        return createUserWithEmailAndPassword(auth, email, pass).then(async(funUserCred) => {
            setError("")
            let userObject = {
                fullName: fullName,
                userName: userName,
                email: email,
                phone: phone,
                country: country,
                status: "UnVerified",
                userType: "user",
                banned: false,
                createdAt: serverTimestamp(),
                uuid: auth.currentUser.uid
            }
            // Add user data to firestore db
            const userRef = collection(firestore, `users`);
            await addDoc(userRef, userObject).then((res) => {
                // added docs
            }, (err)=> console.log('user store err', err))

            // send verification request
            if (!funUserCred.user.emailVerified) {
                sendEmailVerification(auth.currentUser).then(()=> {
                    //Navigate
                })
            }
        },(err)=>{
            setError(`Login Error: ${err.code.split("/")[1]}`)
        });
    }

    const funLogin = async(email, pass) => {
        return signInWithEmailAndPassword(auth, email, pass).then(async(funUser) => {
            setError("")
            if (!funUser.user.emailVerified) {
                // User Not Verified 
            }  else  {
                const userRef = query(collection(firestore, "users"), where("uuid", "==", auth.currentUser.uid))
                window.localStorage.setItem("login", "true")
                
                await getDocs(userRef).then(async (snapshot) => {
                    // if (snapshot.docs[0].)
                    if (snapshot.docs[0].id !== '') {
                        await updateDoc(doc(firestore, `users/${snapshot.docs[0].id}`), {status: "Verified", online:true}).then((res)=> {
                            
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
            window.localStorage.setItem("login", "false")
            setLogout(true)
        }, (err)=> console.log('logout err: ', err))
        
    }

    const GetCurrentUserType = () => {
        if(auth.currentUser) {
            const userQuery = query(collection(firestore, "users"), where("uuid", "==",  auth.currentUser.uid))
            onSnapshot(userQuery,(snap)=>{
                if (snap.docs.length > 0) {
                    setUserType(snap.docs[0].data().userType)
                    setBanned(snap.docs[0].data().banned)
                } else {
                    setBanned(false)
                }
            })
        } else {
            // setUserType("none")
        }
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currfunUser) => {
            setLoading(false)
            setfunUser(currfunUser)
        })
        return () => {
            unsubscribe();
        }
    },[])
    return (
        <FunUserAuthContext.Provider value={{funSignup, funLogin, funLogout, GetCurrentUserType, funUser, loading, logout, userType, error,banned}}>
            {children}
        </FunUserAuthContext.Provider>
    )
}

export const FunUserAuth =() => {
    return useContext(FunUserAuthContext)
}