import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, movieList, setMovieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory()
  

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const editMovie = () => {
     history.push(`/update-movie/${params.id}`)
  }

  const deleteMovie = () => {
     axios.delete(`http://localhost:5000/api/movies/${params.id}`)
     .then((res)=>{
        setMovieList(
          movieList.filter((item)=>{
            if(item.id !== parseInt(params.id))
             return item
          })
        )
        history.push('/')
     })

     .catch((err)=>{
       console.log(err)
     })
  }

  useEffect(() => {
    console.log("in Movie", params.id)
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>

       <div onClick={editMovie}>Edit</div>
        <div onClick={deleteMovie}>Delete</div>
      
    </div>
  );
}

export default Movie;
