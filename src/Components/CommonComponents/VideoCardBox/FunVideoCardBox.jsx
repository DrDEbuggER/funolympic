import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import "./FunVideoCardBox.css"
export const FunVideoCardBox = ({thumbnail, vidTitle, vidEvent, category, onEditClick, onDeleteClick, videoID}) => {
    const trimLongString = (longStr) => {
        if (longStr && longStr.length > 45) {
            return longStr.substring(0, 45) + "..."
        }
        return longStr
    }
    return (
        <div className="fun__videoCardBoxWrapper">
            <div className="fun__videoCardBox">
                <div className="fun__vidThumbWrapper">
                    <img src={thumbnail}></img>
                </div>
                <div className="fun__vidHighlightDesc">
                    <h3>{trimLongString(vidTitle)}</h3>
                    <p className='fun__vidEventPara'>{`${trimLongString(vidEvent)} | ${category}`}</p>
                    <div className='fun__vidEditWrapper'>
                        <div className="fun__vidEdit">
                            <div onClick={()=>onEditClick(videoID)}>
                                <EditIcon className='fun__vidIcon'/>
                            </div>
                            <div onClick={onDeleteClick}>
                                <DeleteIcon className='fun__vidIcon'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}