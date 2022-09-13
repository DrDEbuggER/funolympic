import { useNavigate } from 'react-router-dom'
import "./FunButton.css"
export const FunButton = ({border, backColor, width, height, text, toPage, btnType}) => {
    const funNavigate = useNavigate();
    let btnStyle = {
        backgroundColor: backColor,
        border: border,
        width: width,
        height: height,
    }
    
    return (
        <div className="fun__buttonContainer">
            <button className="fun_button" 
                style={btnStyle} 
                onClick={()=> toPage? funNavigate(toPage): {}}
                type={btnType}
                >
                {text}
            </button>
        </div> 
    )
}