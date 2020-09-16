import React, { useState } from 'react'

const initialState = {
    id: null,
    title: '',
    director: '',
    metascore: '',
}

function AddMovie(props){
    const [movie, setMovie] = useState(initialState)

    const changeHandler = (e) => {
        setMovie({
            ...movie,
            [e.target.name] : e.target.value
        })
    }

    const submitHandler=(e)=> {
        e.preventDefault()
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