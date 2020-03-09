import React from 'react';
import "./card.style.css";

const  Card = ({poster_path, overview, title, tagline, production_companies, release_date, runtime, revenue, vote_average, genres}) => {
    
    return ( 
        <div className="card-container">
            <div className="card-left">
            <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="Movie poster"/>
            </div>
            <div className="card-right">
            <h1>{title.toUpperCase()}</h1>
            <span>{tagline}</span>
            <p>{overview}</p>
            <span>{genres.join(", ")}</span>
            <p>{production_companies.join(", ")}</p>
            <div>
                <div className="movie-info-container">
                    <div className="movie-info-sub">
                        <span>Original Release Date:</span>
                        <p>{release_date}</p>
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
                        <p>{vote_average} / 10</p>
                    </div>
                </div>
            </div>
            <div className="">

            </div>
            </div>
        </div>
     );
}
export default Card;