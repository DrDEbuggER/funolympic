

import { DashboardRounded, DriveFolderUploadOutlined, GroupOutlined, LiveTvOutlined, LogoutOutlined, ManageAccountsOutlined, SmartDisplayOutlined, VerifiedUserOutlined, VideoLibraryOutlined } from "@mui/icons-material"
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

                    <p className='fun__adminSidebarTitle'>Highlights</p>
                    <AdminCustomLink to="/admin/highlights/upload">
                        <DriveFolderUploadOutlined className='icon'/>
                        <span>Upload</span>
                    </AdminCustomLink>
                    <AdminCustomLink to="/admin/highlights/all">
                        <VideoLibraryOutlined className='icon'/>
                        <span>All Highlights</span>
                    </AdminCustomLink>

                    <p className='fun__adminSidebarTitle'>Live</p>
                    <AdminCustomLink to="/admin/live/upload">
                        <DriveFolderUploadOutlined className='icon'/>
                        <span>Upload</span>
                    </AdminCustomLink>
                    <AdminCustomLink to="/admin/live/all">
                        <SmartDisplayOutlined className='icon'/>
                        <span>All Lives</span>
                    </AdminCustomLink>

                    <p className='fun__adminSidebarTitle'>News</p>
                    <AdminCustomLink to="/admin/news/post">
                        <DriveFolderUploadOutlined className='icon'/>
                        <span>Upload</span>
                    </AdminCustomLink>
                    <AdminCustomLink to="/admin/news/all">
                        <SmartDisplayOutlined className='icon'/>
                        <span>All News</span>
                    </AdminCustomLink>
                    
                    <p className='fun__adminSidebarTitle'>More</p>
                    <AdminCustomLink to="/broadcast">
                        <LiveTvOutlined className='icon'/>
                        <span>Broadcast</span>
                    </AdminCustomLink>
                    <AdminCustomLink to="/admin/profile">
                        <ManageAccountsOutlined className='icon'/>
                        <span>Profile</span>
                    </AdminCustomLink>
                    <AdminCustomLink to="/signout">
                        <LogoutOutlined className='icon'/>
                        <span>Logout</span>
                    </AdminCustomLink>
                </ul>
            </div>
        </div>
    )
}