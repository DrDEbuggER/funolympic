
import "./FunChatBox.css";
export const FunChatMessage = ({comment}) => {
    console.log("message", comment)
    return (
        <div className="fun__chatBodyMessage">
            <div className="fun__messageContent">
                <p>{comment}</p>
            </div>
        </div>
    )
}