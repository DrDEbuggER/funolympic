import { useState } from "react"
import { FunUserAuth } from "../../../../FunContext"
import { FunButton } from "../../../CommonComponents"
import { FunAuthNavBar } from "../../../FunLandingComponents"
import "./SignupComponent.css"
export const SignupComponent = () => {
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();
    const {funSignup} = FunUserAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("clicked submit button");
        try {
            await funSignup(email, pass);
        }catch(e) {
            console.log(e.message)
        }
        
    }

    return (
        <>
            <FunAuthNavBar btnText="Login" toPage="/login"/>
            <div className="fun__signupContainer">
                <div className="fun__formWrapper">
                    <form className="fun__form" onSubmit={handleSubmit}>
                        <div className="fun__formInput">
                            <label>Username</label>
                            <input type="text"></input>
                        </div>
                        <div className="fun__formInput">
                            <label>Email</label>
                            <input type="email" onChange={(e)=> setEmail(e.target.value)}></input>
                        </div>
                        <div className="fun__formInput">
                            <label>Phone</label>
                            <input type="text"></input>
                        </div>
                        <div className="fun__formInput">
                            <label>City</label>
                            <input type="text"></input>
                        </div>
                        <div className="fun__formInput">
                            <label>Country</label>
                            <input type="text"></input>
                        </div>
                        <div className="fun__formInput">
                            <label>Password</label>
                            <input type="password" onChange={(e) => setPass(e.target.value)}></input>
                        </div>
                        <FunButton text={"Sign up"} btnType="Submit"/>
                    </form>
                </div>
            </div>
        </>
    )
}