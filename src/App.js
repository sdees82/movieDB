import React from 'react';
import logo from './logo.svg';
import Search from "./components/search/search.component";
import Card from "./components/card/card.component";
import Footer from "./components/footer/footer.component";
import {CalculateRevenue} from "./convert.js"
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
      imdb_id: "tt1411697"
    }
  }

  getMovieData = () =>{
    fetch(`https://api.themoviedb.org/3/movie/${this.state.imdb_id}?api_key=f15acbad2119d7337819f3c8f85e915c&language=en-US`)
    .then(response => response.json())
    .then(data =>{
      console.log(data)
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
    }) 
  }

  componentDidMount(){
    this.getMovieData();
  }

  handleSearch = (e) =>{
    this.setState({search: e.target.value === " " ? "+" : e.target.value});
  }

  submitSearch = (e) =>{
    if(e.charCode ===  13){
      fetch(`http://www.omdbapi.com/?apikey=4c563184&t=${this.state.search}`)
      .then(response=> response.json())
      .then(data => {this.setState({imdb_id: data.imdb_id})
                    //  this.getMovieData();
    })
    }
    
  }

  render(){
    return (
      <div className="App">
        <header className="App-header" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${this.state.backdrop_path})`}}>
          <div className="overlay">
         <Search handleSearch={this.handleSearch} submitSearch={this.submitSearch}/>
         <Card poster_path={this.state.poster_path} 
               title={this.state.title} 
               overview={this.state.overview} 
               tagline={this.state.tagline} 
               production_companies={this.state.production_companies}
               genres={this.state.genres}
               release_date={this.state.release_date}
               runtime={this.state.runtime}
               revenue={this.state.revenue}
               vote_average={this.state.vote_average}
               />
          <Footer/>
         </div>
        </header>
      </div>
    );
  }
}

export default App;
