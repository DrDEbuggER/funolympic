import { useState } from "react"
import { FunUserAuth } from "../../../../FunContext"
import { FunButton } from "../../../CommonComponents"
import { FunAuthNavBar } from "../../../FunLandingComponents"
import "./LoginComponent.css"
export const LoginComponent = () => {
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();
    const {funLogin} = FunUserAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("clicked submit button");
        try {
            await funLogin(email, pass);
        }catch(e) {
            console.log(e.message)
        }
        
    }

    return (
        <>
            <FunAuthNavBar btnText="Signup" toPage="/signup"/>
            <div className="fun__signupContainer">
                <div className="fun__formWrapper">
                    <form className="fun__form" onSubmit={handleSubmit}>
                        <div className="fun__formInput">
                            <label>Email</label>
                            <input type="email" onChange={(e)=> setEmail(e.target.value)}></input>
                        </div>
                        <div className="fun__formInput">
                            <label>Password</label>
                            <input type="password" onChange={(e) => setPass(e.target.value)}></input>
                        </div>
                        <FunButton text={"Login"} btnType="Submit"/>
                    </form>
                </div>
            </div>
        </>
    )
}