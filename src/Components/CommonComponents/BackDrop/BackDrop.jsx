import "./BackDrop.css"
export const BackDrop = ({children, show, handleClick}) => {
    return (
        <div className={`fun__backdrop ${show ?`showModel`: `hideModel`}`} onClick={handleClick}>
            {children}
        </div>
    )
}