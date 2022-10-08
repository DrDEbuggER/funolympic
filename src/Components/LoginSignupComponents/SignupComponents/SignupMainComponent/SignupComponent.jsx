import { async } from "@firebase/util"
import { collection, getDocs, query, where } from "firebase/firestore"
import { useRef, useState } from "react"
import { firestore } from "../../../../firebase"
import { FunUserAuth } from "../../../../FunContext"
import { ErrorMessage, FunButton } from "../../../CommonComponents"
import { FunAuthNavBar } from "../../../FunLandingComponents"
import "./SignupComponent.css"
export const SignupComponent = () => {
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();
    const [confirmPass, setConfirmPass] = useState();
    const [userName, setUserName] = useState();
    const [fullName, setFullName] = useState();
    const [phone, setPhone] = useState();
    const [country, setCountry] = useState();
    // const [userExist, setUserExist] = useState(false)
    const isUserExist = useRef(false)
    const [errMsg, setErrMsg] = useState();
    const {funSignup,error} = FunUserAuth();
   

    const isEmpty = (value) => {
        if(value === "") {
            return true
        } else {
            return false;
        }
    }


    const isUniqueUsername = async(userName) => {
        const userRef = query(collection(firestore, "users"), where("userName", "==", userName))
        await getDocs(userRef).then((snap)=> {
            if (snap.docs.length > 0) {
                isUserExist.current = true
            } else {
                isUserExist.current = false
            } 
        })
        return isUserExist.current
    }
    const isValidUserLength = (userName) => {
        if(userName.length > 12) {
            return false
        } else {
            return true
        }
    }

    function checkPassword(str)
    {
        var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return re.test(str);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!isEmpty(fullName) && 
                !isEmpty(userName) &&
                !isEmpty(email) &&
                !isEmpty(phone) &&
                !isEmpty(country) &&
                !isEmpty(pass) &&
                !isEmpty(confirmPass))
                {
                    setErrMsg("")
                    // validation
                    if (!isValidUserLength(userName)) {
                        setErrMsg("Username musn't be greater than 12 characters")
                        return
                    }
                    isUniqueUsername(userName).then((res)=> {
                        if(res) {
                            setErrMsg("Username already taken")
                            return
                        }   
                        if (!checkPassword(pass)) {
                            setErrMsg("Password must be atlest 8 characters and also include atleast 1 special character, 1 Capital Letter, 1 Small Letter, and 1 numeric value")
                            return
                        }  
                        if (pass !== confirmPass) {
                            setErrMsg("Confirm Password do not match!!")
                            return
                        }
                        funSignup(fullName, userName,email, phone, country, pass);
                    })
                    
            } else {
                // empty field error
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
                            <input type="number" onChange={(e)=> setPhone(e.target.value)} required></input>
                        </div>
                        <div className="fun__formInput">
                            <label>Country</label>
                            <input type="text" onChange={(e)=>setCountry(e.target.value)} required></input>
                        </div>
                        <div className="fun__formInput">
                            <label>Password</label>
                            <input type="password" onChange={(e) => setPass(e.target.value)} required></input>
                        </div>
                        <div className="fun__formInput">
                            <label>Confirm Password</label>
                            <input type="password" onChange={(e) => setConfirmPass(e.target.value)} required></input>
                        </div>
                        <div className="fun__errMsgWrapper">
                            {
                                errMsg ? <ErrorMessage err={errMsg}/>
                                    : <ErrorMessage err={error}/>
                            }
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