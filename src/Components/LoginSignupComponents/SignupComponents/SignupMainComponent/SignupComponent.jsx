import { useState } from "react"
import { FunUserAuth } from "../../../../FunContext"
import { FunButton } from "../../../CommonComponents"
import { FunAuthNavBar } from "../../../FunLandingComponents"
import "./SignupComponent.css"
export const SignupComponent = () => {
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();
    const [userName, setUserName] = useState();
    const [fullName, setFullName] = useState();
    const [phone, setPhone] = useState();
    const [country, setCountry] = useState();
    const {funSignup} = FunUserAuth();

    const isEmpty = (value) => {
        if(value == "") {
            return true
        } else {
            return false;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("clicked submit button");
        try {
            if (!isEmpty(fullName) && 
                !isEmpty(userName) &&
                !isEmpty(email) &&
                !isEmpty(phone) &&
                !isEmpty(country) &&
                !isEmpty(pass)){
                    await funSignup(fullName, userName,email, phone, country, pass);
            } else {
                console.log("please check all the fileds before you register!!")
            }
            
        }catch(e) {
            console.log(e.message)
        }
        
    }

    return (
        <>
            <FunAuthNavBar btnText="Login" toPage="/login"/>
            <div className="fun__signupContainer">
                <div className="fun__formSignupWrapper">
                    <div className="fun__signupLabel">
                        <h3>SIGN UP</h3>
                    </div>
                    <form className="fun__form" onSubmit={handleSubmit}>
                        <div className="fun__formInput">
                            <label>Full Name</label>
                            <input type="text" onChange={(e)=> setFullName(e.target.value)} required></input>
                        </div>
                        <div className="fun__formInput">
                            <label>Username</label>
                            <input type="text" onChange={(e)=> setUserName(e.target.value)} required></input>
                        </div>
                        <div className="fun__formInput">
                            <label>Email</label>
                            <input type="email" onChange={(e)=> setEmail(e.target.value)} required></input>
                        </div>
                        <div className="fun__formInput">
                            <label>Phone</label>
                            <input type="text" onChange={(e)=> setPhone(e.target.value)} required></input>
                        </div>
                        <div className="fun__formInput">
                            <label>Country</label>
                            <input type="text" onChange={(e)=>setCountry(e.target.value)} required></input>
                        </div>
                        <div className="fun__formInput">
                            <label>Password</label>
                            <input type="password" onChange={(e) => setPass(e.target.value)} required></input>
                        </div>
                        <div className="fun__signupBtn">
                            <FunButton text={"Sign up"} btnType="Submit"/>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}