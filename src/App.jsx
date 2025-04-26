import React, { useEffect, useState } from 'react';
import Search from './components/search';
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS ={
  method: 'GET',
  headers:{
    accept:'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = ()=>{
  const [searchTerm, setSearchTerm]  = useState('');
  const [errorMessage, setErrorMessage]= useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if(!response){
        throw new Error('Failed to fetch movies')
      }
      const data = await response.json();
      console.log(data);
  if(data.Response == 'False'){
    setErrorMessage(data.Error || 'Failed To Fetch Movies');
    setMovieList([]);
    return;
  }

  setMovieList(data.results || []);



    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try later.');
    }finally{
      setIsLoading(false);
    }
  };


  useEffect(()=>{
    fetchMovies();
  }, []);

  return(
    <main>
      <div className='pattern'>

        <div className='wrapper'>
          <header>

            <img src ="./hero.png" alt='Hero Banner'/>
            <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy
            Without the Hassle</h1>

            <h1 className="text-white">{searchTerm}</h1>s

          </header>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </div>

        <section className='all-movies'>
          <h2 className='mt-20px'>All Movies</h2>
          {isLoading ? (
            <Spinner/>
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ): (
            <ul>
              {movieList.map((movie) =>(
                <MovieCard key ={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>


      </div>
    </main>
  )
}

export default App