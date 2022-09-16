
import { KeyboardArrowDownOutlined, PersonOutlined } from "@mui/icons-material"
import { SummaryItem } from "../AdminAtoms"
import { AdminLineCharts, AdminPieChart } from "../AdminCharts"
import { AdminWidget } from "../AdminWidget"
import "./AdminDashboard.css"
export const AdminDashboard = () => {

    const GenerateWidgetData = (xTitle, xIsMoney, xLink, Icon) => {
        return {
            title: xTitle,
            isMoney: xIsMoney,
            link: xLink,
            icon:(<Icon className='fun__widgetIcon' style = {{color: 'crimson', backgroundColor: 'rgba(218,165,32,0.2)'}}/>)
        }
    }
    
    return (
        <div className="admin__dashboardContainer">
            <div className="admin__upperComponents">
                <AdminWidget widgetData={GenerateWidgetData("Users", false, "See all users", PersonOutlined)} />
                <AdminWidget widgetData={GenerateWidgetData("Live Users", false, "See all users", PersonOutlined )} />
                <AdminWidget widgetData={GenerateWidgetData("Live Games", false, "See all users", PersonOutlined)} />
                <AdminWidget widgetData={GenerateWidgetData("Watch Hours", false, "See all users", PersonOutlined )} />
            </div>
            <div className="admin__lowerGraphs">
                <div className="admin__totalUsers">
                    <div className="admin__usersUpper">
                        <h3>Users Summary</h3>
                        <AdminPieChart/>
                    </div>
                    <div className="admin__usersLower">
                        <p className="desc__lower">Below summary report provides an overall summary of the users in our system</p>
                        <div className="summary">
                            <SummaryItem CustomIcon={KeyboardArrowDownOutlined} summaryTitle={"All Users"} summaryResult={"1.2k"} />
                            {/* <SummaryItem CustomIcon={KeyboardArrowDownOutlined} summaryTitle={"New Users Today"} summaryResult={"100"} /> */}
                            <SummaryItem CustomIcon={KeyboardArrowDownOutlined} summaryTitle={"Active Users"} summaryResult={"1k"} />
                            <SummaryItem CustomIcon={KeyboardArrowDownOutlined} summaryTitle={"Banned Users"} summaryResult={"100"} />
                        </div>
                    </div>
                </div>
                <div className="admin__totalWatch">
                        <h3>Watch Time (hours)</h3>
                        <AdminLineCharts />
                </div>
            </div>
        </div>
    )
}