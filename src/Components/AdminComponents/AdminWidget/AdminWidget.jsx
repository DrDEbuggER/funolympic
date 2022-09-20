
import { KeyboardArrowUpOutlined } from "@mui/icons-material";
import "./AdminWidget.css";
export const AdminWidget = ({widgetData}) => {
    return (
        <div className="fun__widget">
        <div className="fun__widgetLeft">
            <span className="fun__widgetTitle">{widgetData.title}</span>
            <span className="fun__widgetCounter">{widgetData.liveCount}</span>
            <span className="fun__widgetLink">{widgetData.link}</span>
        </div>
        <div className="fun__widgetRight">
            <div className="fun__widgetPercentage fun__widgetPositive">
                <KeyboardArrowUpOutlined/>
               {Math.floor(Math.random(0, 10) * 10)}
            </div>
            { widgetData.icon}
        </div>
    </div>
    )
}