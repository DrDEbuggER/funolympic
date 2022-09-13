import { sendEmailVerification } from "firebase/auth"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "../../../firebase"
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
        // let iv = 0;
        let interval = setInterval(async() => {
            if (auth.currentUser.emailVerified) {
                clearInterval(interval);
                funNavigate("/broadcast");
            }
            // if (iv > 300) {
            //     // signout if user doesn't verify for 5 min
            //     auth.signOut();
            //     funNavigate("/");
            // }
            // iv+=2;
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