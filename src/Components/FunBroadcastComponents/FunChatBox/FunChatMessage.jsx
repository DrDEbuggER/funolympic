import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./FunChatBox.css";
export const FunChatMessage = ({comment, userName, className}) => {
    return (
        <div className="fun__chatBodyMessage">
            <div className={`fun__messageContent ${className}`}>
                <div className='fun__messageProfile'>
                    <AccountCircleIcon />
                    <h3>{userName}</h3>
                </div>
                <p>{comment}</p>
            </div>
        </div>
    )
}