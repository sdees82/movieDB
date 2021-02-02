import React from 'react';
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
      backdropPath: "",
      poster: "",
      title: "",
      releaseDate: "",
      revenue: "",
      overview: "",
      tagline: "",
      productionCompanies: [],
      genres: [],
      runtime: 0,
      voteAverage: 0,
      imdbId: "tt4154796",
      errorMessage: false
    }
  }

  //Fetch Movie Data from API
  getMovieData = () =>{
    fetch(`https://api.themoviedb.org/3/movie/${this.state.imdbId}?api_key=${imdb}&language=en-US`)
    .then(response => response.json())
    .then(data =>{
      data.status_code === 34 ? this.setState({...this.state.errorMessage, errorMessage: "No Movie Found"}) : (
      this.setState({...this.state.backdropPath, backdropPath: data.backdrop_path,
        ...this.state.posterPath, posterPath: data.poster_path, 
        ...this.state.title, title: data.title, 
        ...this.state.tagline, tagline: data.tagline, 
        ...this.state.overview, overview: data.overview, 
        ...this.state.productionCompanies, productionCompanies: data.production_companies.map(company=> company.name),
        ...this.state.genres, genres: data.genres.map(genre=> genre.name),
        ...this.state.releaseDate, releaseDate: data.releaseDate,
        ...this.state.runtime, runtime: data.runtime,
        ...this.state.revenue, revenue: CalculateRevenue(data.revenue),
        ...this.state.voteAverage, voteAverage: data.vote_average
        })
    );
    }) 
  }

  //Get Movie Data when page loads
  componentDidMount(){
    this.getMovieData();
  }

  //Handle text input change
  handleSearch = (e) =>{
    if(this.state.errorMessage === true){
      this.setState({...this.state.errorMessage, errorMessage: ""});
    }

    this.setState({...this.state.search, search: e.target.value === " " ? "+" : e.target.value});
  }

  //Fetches movie info from API
  submitSearch = (e) =>{
    if(e.charCode ===  13){
      fetch(`https://www.omdbapi.com/?apikey=${omdbapi}&t=${this.state.search}`)
      .then(response=> response.json())
      .then(data => {
        data.status_code === 34 ? this.setState({...this.state.errorMessage, errorMessage: true}) : (
        this.setState({...this.state.imdbId, imdbId: data.imdbID, ...this.state.errorMessage, errorMessage: false}, ()=> this.getMovieData()));
    }).catch(error => this.setState({...this.state.errorMessage, errorMessage : true}));
    }
    
  }

  render(){
    const {backdropPath, errorMessage, posterPath, title, overview, tagline, productionCompanies, genres, releaseDate, runtime, revenue, voteAverage} = this.state;
    return (
      <div className="App">
        <header className="App-header" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${this.state.backdropPath})`}}>
          <div className="overlay">
          <div className="search-container-main">
            <Search 
              handleSearch={this.handleSearch} 
              submitSearch={this.submitSearch}/>
          </div>
         
         {
           this.state.errorMessage === false ? (
            <Card posterPath={posterPath} 
            title={title} 
            overview={overview} 
            tagline={tagline} 
            productionCompanies={productionCompanies}
            genres={genres}
            releaseDate={releaseDate}
            runtime={runtime}
            revenue={revenue}
            voteAverage={voteAverage}
            />
           ) : (
            <h1 className="error-message">NO MOVIE FOUND</h1>
           )
         }
         
          <Footer/>
         </div>
        </header>
      </div>
    );
  }
}

export default App;
