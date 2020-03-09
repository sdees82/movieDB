import React from 'react';
import "./search.style.css";

const Search = ({handleSearch, submitSearch}) => {
    return ( 
        <div className="search-container">
            <input onKeyPress={submitSearch} onChange={handleSearch} className="search" type="text" placeholder="Search Movie title"/>
            {/* <input type="submit" onClick={submitSearch}/> */}
        </div>
     );
}
 
export default Search;