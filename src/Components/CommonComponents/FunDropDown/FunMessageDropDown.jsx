import "./FunDropDown.css"
export const FunMessageDropDown = ({userType, className, loading, data}) => {
    return (
        <div className={`fun__dropDown fun__messageDropDown ${className}`}>
            <h1>Messages</h1>
            {!loading && !data.empty && data.docs.map((cmt,idx) => {
                    return <div className="fun_dropDownItems messageDropDown" key={idx}>
                    <div className="profile__items message__items">
                        <h3>{cmt.data().badTitle} </h3>
                        <p>{cmt.data().badMessage}</p>
                    </div>
                </div>
            })}
        </div>
    )
}