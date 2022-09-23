
import { useState } from "react"
import { FunSelectComponent } from "../../CommonComponents"
import "./FunScore.css"
import { FunScoreBoard } from "./FunScoreBoard"
export const FunScore = () => {
    const [error, setError] = useState("")
    const AllEvents = [
        {
            optName: "Football",
            optValue: "football"
        },
        {
            optName: "Football",
            optValue: "football"
        },
        {
            optName: "Football",
            optValue: "football"
        },
        {
            optName: "Football",
            optValue: "football"
        },
        {
            optName: "Football",
            optValue: "football"
        },
        {
            optName: "Football",
            optValue: "football"
        },
        {
            optName: "Swimming",
            optValue: "swimming"
        }
    ]
    const AllCategories = [
        {
            optName: "Men",
            optValue: "men"
        },
        {
            optName: "Women",
            optValue: "women"
        }
    ]
    return (
        <div className="fun__changePasswordWrapper">
            <div className="fun__changePassword fun__scoreBoard">
                <form className="vid__uploadForm fun__scoreUploadForm" >
                    <div className="fun__scoreSelectEvent">
                        <FunSelectComponent label={`Events`} optData={AllEvents} />
                        <FunSelectComponent label={`Category`} className={`vid__uploadCategory`} optData={AllCategories} />
                    </div>
                    <h3>Football</h3>
                    <FunScoreBoard />
                    
                    <div className="vid__sendReset">
                        <p>{error ? error : "" }</p>
                    </div>
                </form>
            </div>
        </div>
    )
}