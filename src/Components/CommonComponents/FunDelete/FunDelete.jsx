
import { FunLightButton } from "../FunButtonComponent";
import "./FunDelete.css"
export const FunDelete = ({cancelBtnClick, deleteBtnClick, deleteID}) => {
    const disableBubbling = (e) => {
        if (!e) var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();  
    }
    return (
        <div className="fun__deleteWrapper" onClick={disableBubbling}>
            <div className="fun__deleteCard">
                <h3>Are you sure you want to delete?</h3>
                <p>If you delete the content, you can't recover it</p>
                <div className="fun__deleteBtn">
                    <FunLightButton btnLabel={`Cancel`} 
                        className={`fun__smallBtn`} 
                        onBtnClick={cancelBtnClick}/>

                    <FunLightButton btnLabel={`Delete`} 
                        className={`fun__negBtn fun__smallBtn`} 
                        onBtnClick={deleteBtnClick}
                        delID={deleteID}
                        />
                </div>
            </div>
        </div>
    )
}