import ReactPlayer from 'react-player'
import "./FunVideoPlayer.css"
export const FunVideoPlayer = ({url, type, width, height, control}) => {


    return (
        <div className='player-wrapper'>
            <ReactPlayer
              className='react-player'
              url={url}
              width={width}
              height={height}
              controls={control? control : false}
            />
        </div>
    )
    
}
