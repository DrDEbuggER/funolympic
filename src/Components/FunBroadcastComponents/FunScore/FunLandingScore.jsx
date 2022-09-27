import "./FunScore.css"
export const FunLandingScore = ({game, date, teamA, teamB, flagA, flagB, scoreA, scoreB}) => {

    return (
        <div className="fun__landScoreSection">
            <div className="fun__changePassword fun__landingScoreBoard">
                <form className="fun__landingScoreWrapper" >
                    <div className="fun__gameBrief">
                        <h3>{game}</h3>
                        <p>{date}</p>
                    </div>
                    
                    <div className="fun__score">
                        <div className="fun__scoreLeft">
                            <div className="fun__countryWrap">
                                <img src={`https://firebasestorage.googleapis.com/v0/b/bayjingfunolympic2022.appspot.com/o/flags%2F${flagA}.svg?alt=media`}/>
                                <h3>{teamA}</h3>
                            </div>
                            <div className="fun__scorePoint">
                                <p>{scoreA}</p>
                            </div>
                        </div>
                        <div className="fun__scoreRight">
                            <div className="fun__scorePoint">
                                <p>{scoreB}</p>
                            </div>
                            <div className="fun__countryWrap">
                                <h3>{teamB}</h3>
                                <img src={`https://firebasestorage.googleapis.com/v0/b/bayjingfunolympic2022.appspot.com/o/flags%2F${flagB}.svg?alt=media`}/>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}