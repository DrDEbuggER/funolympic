import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PasswordIcon from '@mui/icons-material/Password';
import LogoutIcon from '@mui/icons-material/Logout';
import "./FunDropDown.css"
import { Link } from 'react-router-dom';
import { DashboardOutlined } from '@mui/icons-material';
export const FunDropDown = ({userType}) => {
    return (
        <div className="fun__dropDown ">
            <div className="fun_dropDownItems">
                <div className="profile__items">
                    <ManageAccountsIcon />
                    <Link to={`/profile`}>Profile</Link>
                </div>
                {
                    userType == "admin"?
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
                    <Link to={`/logout`}>Logout</Link>
                </div>
            </div>
        </div>
    )
}