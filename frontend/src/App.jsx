import { useState, useEffect } from 'react'
import MovieDetails from './components/MovieDetails';

function App() {
  const [movie, setMovie] = useState("")
  
  const [allMovies, setAllMovies] = useState([]);
  console.log(allMovies)

  const fetchMovies = async () => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YzM3Mjg3ZDc2OTc3OWQwNGFiMDEzOGZmMGIwYjg4MCIsIm5iZiI6MTcyNTY5OTEyNi44NzY3MjIsInN1YiI6IjY0MTQ1NzE2YTZjMTA0MDA5YTAwM2QwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bf3PiFM0pPoMqKX_46G4esMm5xSrujtPEc90UhrAPLM'
      }
    };
    const response = await fetch(url, options);
    const json = await response.json()
    
    if(response.ok){
      setAllMovies(json.results)
    }


  }

  return (
    <>
    <h1>Search for a movie</h1>
    
     <input type="text" name="" value={movie} onChange={(e) => {setMovie(e.target.value)
      }} />
     <button onClick={() => {fetchMovies()}}>Search </button>
     {allMovies.length > 0 ? <img src={`https://image.tmdb.org/t/p/w300/${allMovies[1].poster_path}`}></img> : ""}
     {movie}
      {allMovies.length > 0 && allMovies.map(movie => { 
        return <MovieDetails
        name={movie.title}
        image={movie.poster_path}
        rating={movie.vote_average}
        overview={movie.overview}
        />
      })

     
      }

    </>
  )
}

export default App
