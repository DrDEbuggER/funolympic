

import "./FunSelectComponent.css"
export const FunSelectComponent = ({label, defaultValue, className, optData, handleOnChange }) => {
    
    return (
        <div className={`${className} vid__uploadSelectContainer`}>
            <label>{label}</label>
            <select className="vid__uploadSelect" value={defaultValue} onChange={handleOnChange}>
                {   
                    optData ?
                        optData.map((opt, idx) => {
                            return (
                                <option key={idx} value={opt.optValue}>{opt.optName}</option>
                            )
                        })
                        :
                        <option value="none">None</option>
                }
            </select>
            
        </div>
    )
}