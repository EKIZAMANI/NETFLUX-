
import './App.css';
import { getMovieList, searchMovie } from "./api"
import { useEffect, useState } from 'react';


const App = () => {
  const [popularMovie, setPopularMovie] = useState([])

  // mengambil data result lalu set dengan variabel useState
  useEffect(() => {
    getMovieList().then((results) => {
      setPopularMovie(results)
    })
  }, [])


  // MERENDER DATA
  const PopularMovieList = () => {
    return popularMovie.map((movie, i) => {
      return (
        <div key={i} className='Movie-wrapper'>
          <img className="Movie-img"
            src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
          ></img>
          <div className="Movie-tittle">{movie.title}</div>
          <div className="Movie-rating">Rating : {movie.vote_average}</div>
          <div className="Movie-date">Release date : {movie.release_date}</div>
        </div>
      )
    })
  }

  const search = async (q) => {
    if (q.length > 3) {

      const query = await searchMovie(q)
      setPopularMovie(query.results)
      console.log({ query: query })
    }

  }

  // console.log({ popularMovie: popularMovie })

  return (
    <div className="App">
      <header className="App-header">
        <h2 className="head">Netflux</h2>
        <input placeholder="Pencarian film disini"
          onChange={({ target }) => search(target.value)}
        />
        <div className='Movie-container'>
          <PopularMovieList />
        </div>
      </header>
    </div>
  );
}

export default App;
