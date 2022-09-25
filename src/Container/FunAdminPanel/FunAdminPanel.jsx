import { AdminAllHighlights, AdminAllLives, AdminDashboard, AdminHighlightUpload, AdminNavBar, AdminNewsUpload, UserListsMain } from "../../Components"
import { AdminLiveUpload } from "../../Components/AdminComponents/AdminLiveUpload"
import { AdminSidebar } from "../../Components/CommonComponents"
import { FunAdminContextProvider } from "../../FunContext"
import "./FunAdminPanel.css"

export const FunAdminPanel = ({pageName}) => {
    return (
        <FunAdminContextProvider>
            <div className="fun__adminContainer">
                <div className="fun__adminPanelSideBar">
                    <div className="fun__adminPanelLogo">
                        <h3>FunOlympic</h3>
                        <div className="fun__border"></div>
                    </div>
                    <div className="fun__gridSidebar">
                        <AdminSidebar />
                    </div>              
                </div>
                <div className="fun__adminComponents">
                    <div className="fun__adminNavBar">
                        <AdminNavBar/>
                        <div className="fun__border"></div>
                    </div>
                    <div className="fun__adminDashContainer">
                        {
                            pageName === "dashboard" ? <AdminDashboard /> :
                            pageName === "users" ? <UserListsMain /> :
                            pageName === "uploadHighlights" ? <AdminHighlightUpload />:
                            pageName === "allHighlights" ? <AdminAllHighlights docPath={'highlights'}/>:
                            pageName === "allLives" ? <AdminAllLives docPath={'lives'}/>:
                            pageName === "uploadLive" ? <AdminLiveUpload />:
                            pageName === "newsPost" ? <AdminNewsUpload />:
                            pageName === "soon" ? <h1> Coming Soon...</h1>: ""                            
                        }
                    </div>
                </div>
            </div>
        </FunAdminContextProvider>
    )


}