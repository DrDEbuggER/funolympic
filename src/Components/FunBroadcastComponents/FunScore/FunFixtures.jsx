
import { useState } from "react"
import { FunSelectComponent } from "../../CommonComponents"
import "./FunScore.css"
import { FunScoreBoard } from "./FunScoreBoard"
export const FunFixtures = ({game, date, teamA, teamB,gameInfo, category}) => {
    const [error, setError] = useState("")
    return (
        <div className="fun__changePasswordWrapper fixPadding">
            <div className="fun__changePassword fun__scoreBoard">
                <div className="vid__uploadForm fun__scoreUploadForm" >
                    <div className="vid__upcomingHeader">
                        <h3>Date: {date}</h3>
                        <p>Upcoming Games</p>
                    </div>
                    
                    <div className="fun__fixtureGame">
                        <p>{game} | {category}</p>
                        <h4>{teamA} vs {teamB} | {gameInfo}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}