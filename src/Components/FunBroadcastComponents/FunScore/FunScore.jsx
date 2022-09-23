

import { EmailAuthProvider, reauthenticateWithCredential, sendPasswordResetEmail } from "firebase/auth"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { auth, firestore } from "../../../firebase"
import { FunLightButton } from "../../CommonComponents"
import "./FunScore.css"
export const FunScore = () => {
    const [error, setError] = useState("")
    const [email, setEmail] = useState("")
    const [currentUser, setCurrentUser] = useState("")
 
    return (
        <div className="fun__changePasswordWrapper">
            <div className="fun__changePassword">
                <form className="vid__uploadForm" >
                    <h3>Game Scores</h3>
                    <p>All Game Score Details.</p>
                    <div className="fun__score">
                        <div className="fun__scoreLeft">
                            <h3>Brazil</h3>
                            <div className="fun__scorePoint">
                                <p>1</p>
                            </div>
                        </div>

                        <div className="fun__scoreRight">
                            <div className="fun__scorePoint">
                                <p>1</p>
                            </div>
                            <h3>Spain</h3>
                        <div/>
                    </div>
                    </div>
                    <div className="vid__sendReset">
                        <p>{error ? error : "" }</p>
                        {/* <FunLightButton btnLabel={"Send Link"} /> */}
                    </div>
                </form>
            </div>
        </div>
    )
}