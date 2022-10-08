import { useNavigate } from "react-router-dom"
import { FunButton } from "../../CommonComponents"

import "./VerifyComponent.css"
export const BannedComponent = () => {
    const funNavigate = useNavigate()
    const HandleExit = (e) => {
        e.preventDefault()
        funNavigate("/logout")
    }

    return (
        <>
            <div className="fun__verifyContainer">
                <div className="fun__formWrapper">
                    <form className="fun__form" onSubmit={HandleExit}>
                        <h1>You're banned from using our service</h1>
                        <p>You cannot use our services anymore because you've violated one of the company's policy. If you think if there's a mistake please feel free to contact us.</p>
                        <FunButton text={"Exit"} btnType="Submit"/>
                    </form>
                </div>
            </div>
        </>
    )
}