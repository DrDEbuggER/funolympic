import { FunFixtures } from "./FunFixtures"
import { FunScore } from "./FunScore"

export const FunResultsMain = () => {
    return(
        <div className="fun__resultWrapper">
            <div className="fun__scoreWrapper">
                <FunScore />
            </div>
            <div className="fun__fixtureWrapper">
                <FunFixtures />
            </div>
        </div>
    )
}