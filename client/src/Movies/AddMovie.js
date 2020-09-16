import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const initialState = {
    id: null,
    title: '',
    director: '',
    metascore: '',
    stars : []
}

function AddMovie({movieList, setMovieList}){
    const [movie, setMovie] = useState(initialState)
    const history = useHistory()

    const changeHandler = (e) => {
        setMovie({
            ...movie,
            [e.target.name] : e.target.value
        })
    }

    const submitHandler=(e)=> {
        e.preventDefault()
        
        axios.post('http://localhost:5000/api/movies', movie)
        .then((res)=>{
            setMovieList(res.data)
            history.push('/')
        })
        .catch((err)=> {
            console.log(err)
        })
    }

    return(
        <>
        <form onSubmit={submitHandler}>
            
            <input 
               name = 'title'
               type = 'text'
               value = {movie.title}
               placeholder = "Enter Title"
               onChange = {changeHandler}
               />
            <input 
               name = 'director'
               type = 'text'
               value = {movie.director}
               placeholder = "Enter director"

               onChange = {changeHandler}
               />
            <input 
               name = 'metascore'
               type = 'text'
               value = {movie.metascore}
               placeholder = "Enter Metascore"

               onChange = {changeHandler}
               />
             <button>submit</button>
        </form>
       
        </>
    )
}

export default AddMovie