
import "./FunSearchBar.css"
import SearchIcon from '@mui/icons-material/Search';
export const FunSearchBar = ({handleSearch, placeholder, className}) => {
    return (
        <div className="fun__searchBarWrapper fun__searchBarWidth">
            <div className={`fun__searchBar ${className}`}>
                <input type={"search"} placeholder={placeholder} onChange={handleSearch}/> 
                <div className="fun__searchIconWrapper">
                    <SearchIcon />
                </div>   
            </div>
        </div>
    )
}