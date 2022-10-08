import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import "./FunVideoCardBox.css"
import { PlayCircleOutlined } from '@mui/icons-material';
export const FunVideoCardBox = ({thumbnail, vidTitle, newsDesc, vidEvent, category, onEditClick, onDeleteClick, videoID, isLanding, isVideo, height, handleContainerClick}) => {
    const trimLongString = (longStr, len) => {
        if (longStr && longStr.length > len) {
            return longStr.substring(0, len) + "..."
        }
        return longStr
    }
    return (
        <div className="fun__videoCardBoxWrapper">
            <div className="fun__videoCardBox" style={{height: height}} onClick={
                handleContainerClick ? 
                    ()=>{
                        handleContainerClick(videoID) 
                    }
                    :""
            }>
                <div className="fun__vidThumbWrapper">
                    <img src={thumbnail} alt=''></img>
                    {
                        isVideo ? 
                            <div className='fun__vidOverlay'>
                                <PlayCircleOutlined sx={{width: 100, height: 100, color:"#e4dcdce5"}}/>
                            </div>
                            : ""
                    }
                    
                </div>
                <div className="fun__vidHighlightDesc">
                    <h3>{trimLongString(vidTitle, 40)}</h3>
                    <p className='fun__vidEventPara'>{`${trimLongString(vidEvent, 45)} | ${category}`}</p>
                    {
                        isLanding === undefined ?
                            <div className='fun__vidEditWrapper'>
                                <div className="fun__vidEdit">
                                    <div onClick={()=>onEditClick(videoID)}>
                                        <EditIcon className='fun__vidIcon'/>
                                    </div>
                                    <div onClick={()=> onDeleteClick(videoID)}>
                                        <DeleteIcon className='fun__vidIcon'/>
                                    </div>
                                </div>
                            </div>
                        : 
                        <p className='fun__landingNewsDesc'>{newsDesc ? trimLongString(newsDesc, 55) : ""}</p>
                    }
                </div>
            </div>
        </div>
    )
}