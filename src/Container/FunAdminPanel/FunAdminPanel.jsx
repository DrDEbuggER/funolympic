import { AdminDashboard, AdminNavBar } from "../../Components"
import { AdminSidebar } from "../../Components/CommonComponents"
import "./FunAdminPanel.css"

export const FunAdminPanel = ({pageName}) => {
    
    return (
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
                    <AdminNavBar />
                    <div className="fun__border"></div>
                </div>
                <div className="fun__adminDashContainer">
                    {
                        pageName === "dashboard" ? <AdminDashboard /> :
                        pageName === "users" ? <h1> Users </h1> :
                        pageName === "highlights" ? <h1> Highlights</h1>:
                        pageName === "soon" ? <h1> Coming Soon...</h1>: ""
                    }
                </div>
            </div>
        </div>
    )


}