
import { PersonOutlined } from "@mui/icons-material"
import { AdminFireDataContext } from "../../../FunContext"
import { AdminWidget } from "../AdminWidget"
import AdminDataGrid from "../AdminWidget/AdminDataGrid"
import "./UserLists.css"
export const UserListsMain = () => {
    const {usersData} = AdminFireDataContext()
    const {liveCount} = AdminFireDataContext()
    const {totalUserCount} = AdminFireDataContext()
    const {bannedCount} = AdminFireDataContext()
    const {newUserCount} = AdminFireDataContext()
    const GenerateWidgetData = (xTitle, xLiveCount, xLink, Icon) => {
        return {
            title: xTitle,
            liveCount: xLiveCount,
            link: xLink,
            icon:(<Icon className='fun__widgetIcon' style = {{color: 'crimson', backgroundColor: 'rgba(218,165,32,0.2)'}}/>)
        }
    }
    return (
        <div className="user__mainContainer">
            <div className="user__upperSection">
                <AdminWidget widgetData={GenerateWidgetData("Total Users", totalUserCount, "See all users", PersonOutlined)} />
                <AdminWidget widgetData={GenerateWidgetData("Live Users", liveCount, "See all users", PersonOutlined )} />
                <AdminWidget widgetData={GenerateWidgetData("Banned Users", bannedCount, "See all users", PersonOutlined)} />
                <AdminWidget widgetData={GenerateWidgetData("New Users", newUserCount, "See all users", PersonOutlined )} />
            </div>
            <div className="user__lowerSection">
                { usersData ? <AdminDataGrid usersData={usersData}/> : "Loading..." }
            </div>
        </div>
    )
}