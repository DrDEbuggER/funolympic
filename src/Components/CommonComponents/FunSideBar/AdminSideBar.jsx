

import { DashboardRounded, GroupOutlined, VerifiedUserOutlined, VideoLibraryOutlined } from "@mui/icons-material"
import { AdminCustomLink } from "./AdminCustomLink"
import "./Sidebar.css"

export const AdminSidebar = () => {
    return(
        <div className="fun_adminSidebarContainer">
            <div className="fun__adminSidebar">
                <ul className="fun__ul">
                    <p className='fun__adminSidebarTitle'>General</p>
                    <AdminCustomLink to="/admin/dashboard">
                        <DashboardRounded className='icon'/>
                        <span>Dashboard</span>
                    </AdminCustomLink>
                    <AdminCustomLink to="/admin/users">
                        <GroupOutlined className='icon'/>
                        <span>User List</span>
                    </AdminCustomLink>
                    <AdminCustomLink to="/admin/highlights">
                        <VideoLibraryOutlined className='icon'/>
                        <span>Highlights</span>
                    </AdminCustomLink>
                </ul>
            </div>
        </div>
    )
}