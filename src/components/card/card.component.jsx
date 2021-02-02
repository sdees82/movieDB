import React from 'react';
import "./card.style.css";

const  Card = ({posterPath, overview, title, tagline, productionCompanies, releaseDate, runtime, revenue, voteAverage, genres}) => {
    
    return ( 
        <div className="card-container">
            <div className="card-left">
            <img src={`https://image.tmdb.org/t/p/w500/${posterPath}`} alt="Movie poster"/>
            </div>
            <div className="card-right">
            <h1>{title.toUpperCase()}</h1>
            <span>{tagline}</span>
            <p>{overview}</p>
            <span>{genres.join(", ")}</span>
            <p>{productionCompanies.join(", ")}</p>
            <div>
                <div className="movie-info-container">
                    <div className="movie-info-sub">
                        <span>Original Release Date:</span>
                        <p>{releaseDate}</p>
                    </div>
                    <div className="movie-info-sub">
                        <span>Running Time:</span>
                        <p>{runtime} mins</p>
                    </div>
                </div>
                <div className="movie-info-container">
                    <div className="movie-info-sub">
                        <span>Box Office:</span>
                        <p>${revenue}</p>
                    </div>
                    <div className="movie-info-sub">
                        <span>Vote Average:</span>
                        <p>{voteAverage} / 10</p>
                    </div>
                </div>
            </div>
            </div>
        </div>
     );
}
export default Card;