import { collection, onSnapshot, query, where } from "firebase/firestore"
import { useState } from "react"
import { useEffect } from "react"
import { useContext } from "react"
import { createContext } from "react"
import { firestore } from "../../firebase"


const AdminDataContext = createContext()

export const FunAdminContextProvider = ({children}) => {
    const [usersData, setUsersData] = useState()
    const [liveCount, setLiveCount] = useState(0)
    const [bannedCount, setBannedCount] = useState(0)
    const [newUserCount, setNewUserCount] = useState(2)
    const [totalUserCount, setTotalUserCount] = useState(0)

    const FetchAllUsers = () => {
        const userQuery = query(collection(firestore, "users"))
        let tempData = []
        onSnapshot(userQuery, (snap) => {
            tempData = []
            snap.docs.forEach((doc) => {
                tempData.push(doc.data())
            })
            setUsersData(tempData)
            setTotalUserCount(snap.docs.length)
        })
    }

    const CalculateCount = (field, keyword, setCount) => {
        const userQuery = query(collection(firestore, "users"), where(field, "==", keyword))
        onSnapshot(userQuery, (snap) => {
            setCount(snap.docs.length)
            return;
        })
        setCount(0);
    }

    useEffect (()=> {
        FetchAllUsers()
        CalculateCount("online", true, setLiveCount)
        CalculateCount("status", "Banned", setBannedCount)
    },[])

    return (
        <AdminDataContext.Provider value={{liveCount, totalUserCount, newUserCount, bannedCount, usersData}}>
            {children}
        </AdminDataContext.Provider>
    )
}

export const AdminFireDataContext = () => {
    return useContext(AdminDataContext);
}