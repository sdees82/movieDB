import React from 'react';
import "./search.style.css";

const Search = ({handleSearch, submitSearch}) => {
    return ( 
        <React.Fragment>
            <input onChange={handleSearch} className="search" type="text" placeholder="Search Movie title"/>
            <input type="submit" onClick={submitSearch}/>
        </React.Fragment>
     );
}
 
export default Search;