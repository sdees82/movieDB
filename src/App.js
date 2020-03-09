import React from 'react';
import logo from './logo.svg';
import Search from "./components/search/search.component";
import Card from "./components/card/card.component";
import './App.css';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      search: "",
      backDrop: "",
      poster: "",
      title: "",
      releaseDate: "",
      revenue: "",
      overview: "",
      tagline: ""
    }
  }

  getMovieData = () =>{
    fetch("https://api.themoviedb.org/3/movie/550?api_key=f15acbad2119d7337819f3c8f85e915c&language=en-US")
    .then(response => response.json())
    .then(data =>{
      console.log(data)
      this.setState({backdrop: data.backdrop_path, title: data.title, tagline: data.tagline, overview: data.overview})
    }) 
  }

  componentDidMount(){
    this.getMovieData();
  }

  handleSearch = (e) =>{
    this.setState({search: e.target.value});
  }

  submitSearch = () =>{
    this.getMovieData();
  }

  render(){
    return (
      <div className="App">
        <header className="App-header" style={{backgroundImage: "url(https://image.tmdb.org/t/p/original/xu9zaAevzQ5nnrsXN6JcahLnG4i.jpg)"}}>
          <div className="overlay">
         <Search handleSearch={this.handleSearch} submitSearch={this.submitSearch}/>
         <Card backdrop={this.state.backdrop} title={this.state.title} overview={this.state.overview} tagline={this.state.tagline}/>
         </div>
        </header>
      </div>
    );
  }
}

export default App;
