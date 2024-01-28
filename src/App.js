
import './App.css';
import {getMovieList, searchMovie} from "./api"
import { useEffect, useState } from 'react';


const App = () => {
  const [popularMovie, setPopularMovie] = useState ([])

  // mengambil data result lalu set dengan variabel useState
  useEffect(()=>{
    getMovieList().then((results) => {
      setPopularMovie(results)
    })
  }, [])  


  // MERENDER DATA
  const PopularMovieList = () => {
    return popularMovie.map((movie, i) => {
      return (
        <div key={i}>
          <img className="Movie-img" 
            src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
          />
            <div className="Movie-tittle">{movie.title}</div>
            <div className="Movie-rating">{movie.vote_average}</div>
            <div className="Movie-date">{movie.release_date}</div>
        </div>
      )
    })
  }

  const search = ({q}) => {
    console.log({q})
  }

  console.log({popularMovie: popularMovie})

  return (
    <div className="App">
      <header className="App-header">
        <h2>Netflux Movie</h2>
        <input placeholder="Pencarian film disini"
          onChange = {({ target }) => search( target.value )}
        />
        <div className='Movie-container'>
          <PopularMovieList/>          
        </div>
      </header>
    </div>
  );
}

export default App;
