
import { useState } from "react"
import { FunSelectComponent } from "../../CommonComponents"
import "./FunScore.css"
import { FunScoreBoard } from "./FunScoreBoard"
export const FunFixtures = ({data}) => {
    const [error, setError] = useState("")
    return (
        <div className="fun__changePasswordWrapper">
            <div className="fun__changePassword fun__scoreBoard">
                <div className="vid__uploadForm fun__scoreUploadForm" >
                    <h3>Date: 2022-09-15</h3>
{/*                     
                    {
                        data.map((fData,idx)=> {
                            console.log()
                        })
                    } */}

                    <div className="fun__fixtureGame">
                        <p>Football | Men</p>
                        <h4>Brazil vs Spain | Fun Olympic Bronze Match</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}