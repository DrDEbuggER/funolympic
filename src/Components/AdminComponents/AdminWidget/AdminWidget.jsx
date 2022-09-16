
import { KeyboardArrowUpOutlined } from "@mui/icons-material";
import "./AdminWidget.css";
export const AdminWidget = ({widgetData}) => {
    const amount = 12;
    const diff = 12;
    return (
        <div className="fun__widget">
        <div className="fun__widgetLeft">
            <span className="fun__widgetTitle">{widgetData.title}</span>
            <span className="fun__widgetCounter">{widgetData.isMoney && '$' } {amount}</span>
            <span className="fun__widgetLink">{widgetData.link}</span>
        </div>
        <div className="fun__widgetRight">
            <div className="fun__widgetPercentage fun__widgetPositive">
                <KeyboardArrowUpOutlined/>
               {diff}
            </div>
            { widgetData.icon}
        </div>
    </div>
    )
}