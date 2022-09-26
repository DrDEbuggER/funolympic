import { FunButton } from "../../CommonComponents"

import "./VerifyComponent.css"
export const BannedComponent = () => {
    return (
        <>
            <div className="fun__verifyContainer">
                <div className="fun__formWrapper">
                    <form className="fun__form" >
                        <h1>You're banned from using our service</h1>
                        <p>Email verification link has been sent to you email. Please check your <strong>SPAM</strong> folder. If you haven't got any mail, please click on <strong>Resend</strong> button to get your email.</p>
                        <FunButton text={"Exit"} btnType="Submit"/>
                    </form>
                </div>
            </div>
        </>
    )
}