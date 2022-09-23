import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PasswordIcon from '@mui/icons-material/Password';
import LogoutIcon from '@mui/icons-material/Logout';
import "./FunDropDown.css"
import { Link } from 'react-router-dom';
import { DashboardOutlined } from '@mui/icons-material';
import { cardMediaClasses } from '@mui/material';
export const FunMessageDropDown = ({userType, className, loading, data}) => {
    {console.log("data",data)}
    return (
        <div className={`fun__dropDown fun__messageDropDown ${className}`}>
            <h1>Messages</h1>
            {!loading && !data.empty && data.docs.map((cmt,idx) => {
                    return <div className="fun_dropDownItems messageDropDown" key={idx}>
                    <div className="profile__items message__items">
                        <h3>{cmt.data().badTitle} </h3>
                        <p>{cmt.data().badMessage}</p>
                    </div>
                </div>
            })}
        </div>
    )
}