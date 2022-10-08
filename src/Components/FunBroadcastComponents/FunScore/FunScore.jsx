
import { useState } from "react"
import { FunSelectComponent } from "../../CommonComponents"
import "./FunScore.css"
import { FunScoreBoard } from "./FunScoreBoard"
export const FunScore = () => {
    const [error, setError] = useState("")
    const [gameEvent, setGameEvent] = useState("football")
    const AllEvents = [
        {
            optName: "Football",
            optValue: "football"
        },
        {
            optName: "Hockey",
            optValue: "hockey"
        },
        {
            optName: "Volleyball",
            optValue: "volleyball"
        },
        {
            optName: "Basketball",
            optValue: "basketball"
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
    const HandleEventChange = (e) => {
        setGameEvent(e.target.value)
    }
    return (
        <div className="fun__changePasswordWrapper">
            <div className="fun__changePassword fun__scoreBoard">
                <p>Results</p>
                <form className="vid__uploadForm fun__scoreUploadForm" >
                    <div className="fun__scoreSelectEvent">
                        <FunSelectComponent label={`Events`} optData={AllEvents} handleOnChange={HandleEventChange}/>
                        <FunSelectComponent label={`Category`} className={`vid__uploadCategory`} optData={AllCategories} />
                    </div>
                    {
                        gameEvent === "football"?
                            <div>
                                <h3>Football</h3>
                                <FunScoreBoard 
                                     date={`2022-09-17`}   
                                     teamA={`Brazil`}
                                     teamB={`Germany`}
                                     scoreA={1}
                                     scoreB={0}
                                     flagA={`br`}
                                     flagB={`de`}
                                        />
                            </div> :
                        gameEvent === "hockey" ?
                        <div> 
                            <h3>Hockey</h3>
                            <FunScoreBoard 
                                date={`2022-09-15`}   
                                teamA={`India`}
                                teamB={`Australia`}
                                scoreA={5}
                                scoreB={6}
                                flagA={`in`}
                                flagB={`au`}
                                   />
                        </div> :
                        gameEvent === "volleyball" ?
                        <div>
                            <h3>Volleyball</h3>
                            <FunScoreBoard 
                                     date={`2022-09-13`}   
                                     teamA={`Japan`}
                                     teamB={`England`}
                                     scoreA={2}
                                     scoreB={3}
                                     flagA={`jp`}
                                     flagB={`gb-eng`}
                                        />
                        </div>  :
                        gameEvent === "basketball" ?
                            <div>
                                <h3>Basketball</h3>      
                                <FunScoreBoard 
                                     date={`2022-09-11`}   
                                     teamA={`USA`}
                                     teamB={`Greece`}
                                     scoreA={115}
                                     scoreB={99}
                                     flagA={`us`}
                                     flagB={`gr`}
                                        />
                            </div>
                        : ""

                    }
                    <div className="vid__sendReset">
                        <p>{error ? error : "" }</p>
                    </div>
                </form>
            </div>
        </div>
    )
}