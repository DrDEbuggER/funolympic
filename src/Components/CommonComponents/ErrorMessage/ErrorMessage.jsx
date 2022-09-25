import "./ErrorMessage.css"
export const ErrorMessage = ({err}) => {
    return (
        <div>
            <p className="fun_errmsg">{err}</p>
        </div>
    )
}