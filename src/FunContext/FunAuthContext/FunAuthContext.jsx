import { createContext, useContext, useEffect, useState } from "react"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendEmailVerification
} from "firebase/auth"
import { auth } from "../../firebase";
// creating user auth context
const FunUserAuthContext = createContext();


export const FunAuthContextProvider = ({children}) => {
    const [funUser, setfunUser] = useState();
    const [loading, setLoading] = useState(true);
    const funSignup = (email, pass) => {
        return createUserWithEmailAndPassword(auth, email, pass).then((funUserCred) => {
            console.log("fun User Cread:", funUserCred)
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
            }
        });
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
        <FunUserAuthContext.Provider value={{funSignup, funLogin, funUser, loading}}>
            {children}
        </FunUserAuthContext.Provider>
    )
}

export const FunUserAuth =() => {
    return useContext(FunUserAuthContext)
}