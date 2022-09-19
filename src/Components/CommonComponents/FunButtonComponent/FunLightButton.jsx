
import "./FunButton.css"
export const FunLightButton = ({btnLabel, onBtnClick, btnType}) => {
    return(
        <div className="fun__lightButtonContainer">
            <button className="fun__lightButton" onClick={()=> onBtnClick} type={btnType}>{btnLabel}</button>
        </div>
    )
}