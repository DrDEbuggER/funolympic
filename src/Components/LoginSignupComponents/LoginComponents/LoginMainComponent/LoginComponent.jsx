import { useState } from "react"
import { FunUserAuth } from "../../../../FunContext"
import { ErrorMessage, FunButton } from "../../../CommonComponents"
import { FunAuthNavBar } from "../../../FunLandingComponents"
import "./LoginComponent.css"
export const LoginComponent = () => {
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();
    const {funLogin, error} = FunUserAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await funLogin(email, pass);
        }catch(e) {
        }
        
    }

    return (
        <>
            <FunAuthNavBar btnText="Signup" toPage="/signup"/>
            <div className="fun__LoginContainer">
                <div className="fun__formWrapper">
                    <div className="fun__loginLabel">
                        <h3>LOGIN</h3>
                    </div>
                    <form className="fun__form" onSubmit={handleSubmit}>
                        <div className="fun__formInput">
                            <label>Email</label>
                            <input type="email" onChange={(e)=> setEmail(e.target.value)} required></input>
                        </div>
                        <div className="fun__formInput">
                            <label>Password</label>
                            <input type="password" onChange={(e) => setPass(e.target.value)} required></input>
                        </div>
                        <div className="fun__forgotPassword">
                            <a href="/reset">Forgot Password?</a>
                        </div>
                        <div className="fun__errMsgWrapper">
                            {
                                error ? <ErrorMessage err={error}/>: ""
                            }
                        </div>
                        <div className="fun__loginButton">
                            <FunButton text={"Login"} btnType="Submit"/>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}