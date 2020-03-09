import React from 'react';
import "./card.style.css";

const  Card = ({backdrop, overview, title, tagline}) => {
    
    return ( 
        <div className="card-container">
            <div className="card-left">
            <img src="https://image.tmdb.org/t/p/w500/nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg" alt="Movie poster"/>
            </div>
            <div className="card-right">
            <h1>{title}</h1>
            <p>{tagline}</p>
            <p>{overview}</p>
            <h2></h2>
            <p></p>
            <div className="">

            </div>
            </div>
        </div>
     );
}
export default Card;