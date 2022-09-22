
import "./FunSearchBar.css"
import SearchIcon from '@mui/icons-material/Search';
export const FunSearchBar = ({handleSearch, placeholder}) => {
    return (
        <div className="fun__searchBarWrapper">
            <div className="fun__searchBar">
                <input type={"search"} placeholder={placeholder} onChange={handleSearch}/> 
                <div className="fun__searchIconWrapper">
                    <SearchIcon />
                </div>   
            </div>
        </div>
    )
}