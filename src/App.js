import logo from './logo.svg';
import './App.css';
import api from "./api/axiosConfig";
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Review';
import NotFound from "./components/notFound/NotFound";

function App() {

  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);

  console.log(process.env.BASE_URL);

  const getMovies = async () => {
    try {
      const response = await api.get("api/v1/movies");

      setMovies(response.data);

    } catch (error) {
      console.log(error);
    }
  }

  const getReviews = async (movieId) => {
    try {
      const reviewResponse = await api.get(`/api/v1/reviews/${movieId}`);

      const movieResponse = await api.get(`/api/v1/movies/${movieId}`);

      const reviewsData = reviewResponse.data;

      const singleMovie = movieResponse.data;

      setMovie(singleMovie);

      setReviews(reviewsData);

      console.log(reviewsData);

    } catch (error) {
      
    }
}

  useEffect(() => {
    getMovies();
  }, [])


  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home movies={movies} />} ></Route>
          <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
          <Route path="/Reviews/:movieId" element ={<Reviews getReviews = {getReviews} movie={movie} reviews ={reviews} setReviews = {setReviews} />}></Route>
          <Route path="*" element = {<NotFound/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
