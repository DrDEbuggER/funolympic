
import "./FunButton.css"
export const FunLightButton = ({btnLabel, onBtnClick, btnType, delID}) => {
    return(
        <div className="fun__lightButtonContainer">
            <button className="fun__lightButton" onClick={()=> onBtnClick(delID)} type={btnType}>{btnLabel}</button>
        </div>
    )
}