
import { KeyboardArrowDownOutlined, PersonOutlined } from "@mui/icons-material"
import { collection, getDocs } from "firebase/firestore"
import { useEffect, useRef, useState } from "react"
import { firestore } from "../../../firebase"
import { AdminFireDataContext } from "../../../FunContext"
import { SummaryItem } from "../AdminAtoms"
import { AdminLineCharts, AdminPieChart } from "../AdminCharts"
import { AdminWidget } from "../AdminWidget"
import "./AdminDashboard.css"
export const AdminDashboard = () => {
    const {totalUserCount} = AdminFireDataContext();
    const {liveCount, bannedCount} = AdminFireDataContext();
    const [watchHour, setWatchHour] = useState(0)
    // const watchHour = useRef(0);

    const data = [
        { name: 'New Users', Total: totalUserCount},
        { name: 'Active Users', Total: liveCount},
        { name: 'Banned Users', Total: bannedCount},
      ];

    const GenerateWidgetData = (xTitle, xLiveCount, xLink, Icon) => {
        return {
            title: xTitle,
            liveCount: xLiveCount,
            link: xLink,
            icon:(<Icon className='fun__widgetIcon' style = {{color: 'crimson', backgroundColor: 'rgba(218,165,32,0.2)'}}/>)
        }
    }

        
    const WatchCount = async() => {
        const queryRef =  collection(firestore, `watchCount`)
        await getDocs(queryRef).then((res)=>{
            let watchTimeInServer = 0;
            res.forEach((doc)=> {
                watchTimeInServer += Math.round(doc.data().watchTime);
                
            })
            if (watchTimeInServer > 60) {
                let temp = Math.round(watchTimeInServer/60)
                if ( temp < 60) {
                    setWatchHour(Math.floor(watchTimeInServer/60)+"m")
                } else {
                    setWatchHour(Math.floor((watchTimeInServer/60)/60)+"h")
                }
            } else {
                setWatchHour(Math.floor(watchTimeInServer)+"s")
            }
            
            // setWatchHour(hour)
        })
    }
    

    useEffect(()=>{
        // if(type != "live") 
        //     return
        WatchCount()
        const calculateWatchTime = setInterval(() => {
            WatchCount()
        }, 10000);
        return ()=> clearInterval(calculateWatchTime)
    },[])
    
    return (
        <div className="admin__dashboardContainer">
            <div className="admin__upperComponents">
                <AdminWidget widgetData={GenerateWidgetData("Users", totalUserCount, "See all users", PersonOutlined)} />
                <AdminWidget widgetData={GenerateWidgetData("Live Users", liveCount, "See all users", PersonOutlined )} />
                <AdminWidget widgetData={GenerateWidgetData("Live Games", 2, "See all users", PersonOutlined)} />
                <AdminWidget widgetData={GenerateWidgetData("Watch Hours", watchHour, "See all users", PersonOutlined )} />
            </div>
            <div className="admin__lowerGraphs">
                <div className="admin__totalUsers">
                    <div className="admin__usersUpper">
                        <h3>Users Summary</h3>
                        <AdminPieChart data={data}/>
                    </div>
                    <div className="admin__usersLower">
                        <p className="desc__lower">Below summary report provides an overall summary of the users in our system</p>
                        <div className="summary">
                            <SummaryItem CustomIcon={KeyboardArrowDownOutlined} summaryTitle={"All Users"} summaryResult={totalUserCount} />
                            {/* <SummaryItem CustomIcon={KeyboardArrowDownOutlined} summaryTitle={"New Users Today"} summaryResult={"100"} /> */}
                            <SummaryItem CustomIcon={KeyboardArrowDownOutlined} summaryTitle={"Active Users"} summaryResult={liveCount} />
                            <SummaryItem CustomIcon={KeyboardArrowDownOutlined} summaryTitle={"Banned Users"} summaryResult={bannedCount} />
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