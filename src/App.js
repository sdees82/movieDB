import React from 'react';
import logo from './logo.svg';
import Search from "./components/search/search.component";
import Card from "./components/card/card.component";
import Footer from "./components/footer/footer.component";
import {CalculateRevenue} from "./convert.js"

import {imdb, omdbapi} from "./config";
import './App.css';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      search: "",
      backdrop_path: "",
      poster: "",
      title: "",
      releaseDate: "",
      revenue: "",
      overview: "",
      tagline: "",
      production_companies: [],
      genres: [],
      release_date: 0,
      runtime: 0,
      revenue: 0,
      vote_average: 0,
      imdb_id: "tt4154796",
      error_message: ""
    }
  }

  getMovieData = () =>{
    fetch(`https://api.themoviedb.org/3/movie/${this.state.imdb_id}?api_key=${imdb}&language=en-US`)
    .then(response => response.json())
    .then(data =>{
      data.status_code === 34 ? this.setState({error_message: "Movie not found!"}) : (
      this.setState({backdrop_path: data.backdrop_path,
        poster_path: data.poster_path, 
        title: data.title, 
        tagline: data.tagline, 
        overview: data.overview, 
        production_companies: data.production_companies.map(company=> company.name),
        genres: data.genres.map(genre=> genre.name),
        release_date: data.release_date,
        runtime: data.runtime,
        revenue: CalculateRevenue(data.revenue),
        vote_average: data.vote_average
        })
    );
    }); 
  }

  componentDidMount(){
    this.getMovieData();
  }

  handleSearch = (e) =>{
    if(this.state.error_message.length > 0){
      this.setState({error_message: ""});
    }

    this.setState({search: e.target.value === " " ? "+" : e.target.value});
  }

  submitSearch = (e) =>{
    if(e.charCode ===  13){
      fetch(`https://www.omdbapi.com/?apikey=${omdbapi}&t=${this.state.search}`)
      .then(response=> response.json())
      .then(data => {
        data.Error === "Movie not found!" ? this.setState({error_message: "Movie not found!"}) : (
        this.setState({imdb_id: data.imdbID}, ()=> this.getMovieData()));
    })
    }
    
  }

  render(){
    const {backdrop_path, error_message, poster_path, title, overview, tagline, production_companies, genres, release_date, runtime, revenue, vote_average} = this.state;
    return (
      <div className="App">
        <header className="App-header" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${this.state.backdrop_path})`}}>
          <div className="overlay">
          <div className="search-container-main">
            <h1 className="error-message">{this.state.error_message.toUpperCase()}</h1>
            <Search 
              handleSearch={this.handleSearch} 
              submitSearch={this.submitSearch}/>
          </div>
         
         <Card poster_path={poster_path} 
               title={title} 
               overview={overview} 
               tagline={tagline} 
               production_companies={production_companies}
               genres={genres}
               release_date={release_date}
               runtime={runtime}
               revenue={revenue}
               vote_average={vote_average}
               />
          <Footer/>
         </div>
        </header>
      </div>
    );
  }
}

export default App;
