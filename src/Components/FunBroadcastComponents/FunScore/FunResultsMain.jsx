import { FunFixtures } from "./FunFixtures"
import { FunScore } from "./FunScore"

export const FunResultsMain = () => {
    return(
        <div className="fun__resultWrapper">
            <div className="fun__scoreWrapper">
                <FunScore />
            </div>
            <div className="fun__fixtureWrapper">
                <FunFixtures game={`football`} 
                    teamA={`Brazil`}
                    teamB={`Spain`}
                    gameInfo={`FunOlympics Gold Medal Match (Final)`} 
                    date={`2022-10-20`}
                    category={`Men`}
                    />
                <FunFixtures game={`basketball`} 
                    teamA={`USA`}
                    teamB={`Japan`}
                    gameInfo={`FunOlympics Silver Medal Match`} 
                    date={`2022-10-17`}
                    category={`Men`}
                />
                <FunFixtures game={`hockey`} 
                    teamA={`Australia`}
                    teamB={`Chile`}
                    gameInfo={`FunOlympics Bronze Medal Match`} 
                    date={`2022-10-20`}
                    category={`Men`}
                />
            </div>
        </div>
    )
}