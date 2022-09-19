
import { PersonOutlined } from "@mui/icons-material"
import { AdminWidget } from "../AdminWidget"
import AdminDataGrid from "../AdminWidget/AdminDataGrid"
import "./UserLists.css"
export const UserListsMain = () => {
    const GenerateWidgetData = (xTitle, xIsMoney, xLink, Icon) => {
        return {
            title: xTitle,
            isMoney: xIsMoney,
            link: xLink,
            icon:(<Icon className='fun__widgetIcon' style = {{color: 'crimson', backgroundColor: 'rgba(218,165,32,0.2)'}}/>)
        }
    }
    return (
        <div className="user__mainContainer">
            <div className="user__upperSection">
                <AdminWidget widgetData={GenerateWidgetData("Total Users", false, "See all users", PersonOutlined)} />
                <AdminWidget widgetData={GenerateWidgetData("Live Users", false, "See all users", PersonOutlined )} />
                <AdminWidget widgetData={GenerateWidgetData("Banned Users", false, "See all users", PersonOutlined)} />
                <AdminWidget widgetData={GenerateWidgetData("New Users", false, "See all users", PersonOutlined )} />
            </div>
            <div className="user__lowerSection">
                <AdminDataGrid />
            </div>
        </div>
    )
}