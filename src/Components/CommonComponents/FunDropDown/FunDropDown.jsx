import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PasswordIcon from '@mui/icons-material/Password';
import LogoutIcon from '@mui/icons-material/Logout';
import "./FunDropDown.css"
import { Link, useNavigate } from 'react-router-dom';
import { DashboardOutlined } from '@mui/icons-material';
import { auth } from '../../../firebase';
export const FunDropDown = ({userType}) => {
    const FunNavigate = useNavigate();
    const HandleSignoutClick = () => {
        if (!auth.currentUser.emailVerified) {
            FunNavigate("/")
        }
    }
    return (
        <div className="fun__dropDown ">
            <div className="fun_dropDownItems">
                <div className="profile__items">
                    <ManageAccountsIcon />
                    <Link to={`/profile`}>Profile</Link>
                </div>
                {
                    userType === "admin"?
                        <div className="profile__items">
                            <DashboardOutlined />
                            <Link to={`/admin/dashboard`}>Admin Dashboard</Link>
                        </div>
                        :
                        ""
                }
                <div className="profile__items">
                    <PasswordIcon />
                    <Link to={`/changepass`}>Change Password</Link>
                </div>
                <div className="profile__items">
                    <LogoutIcon />
                    {
                        auth.currentUser.emailVerified ? 
                            <Link to={`/signout`} onClick={HandleSignoutClick}>Logout</Link>
                            : 
                            <div onClick={HandleSignoutClick}> Logout </div>
                    }
                    
                </div>
            </div>
        </div>
    )
}