import React, { useState, useEffect }from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

const initialItem = {
    title: "",
    director : "",
    metascore: ""
}

function UpdateMovie(props){
    const { movieList, setMovieList } = props

    const params = useParams()
    const history = useHistory()
    const [movie, setMovie] = useState(initialItem)

    useEffect(()=> {
        axios
        .get(`http://localhost:5000/api/movies/${params.id}`)
        .then(res=>{
            setMovie(res.data)
            
        })
        .catch(err=>{
            console.log(err)
        })
    }, [params.id])

    const changeHandler = (e) => {
        setMovie({
            ...movie,
            [e.target.name] : e.target.value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        console.log("submitting movie", movie)
        axios.put(`http://localhost:5000/api/movies/${params.id}`, movie)
        .then((res)=>{
                setMovieList(
                    movieList.map(item=>{
                        if(item.id === parseInt(params.id))
                        return res.data
                        else
                        return item
                    })
                
                )
            history.push('/')

        })
        .catch((err)=>{
            console.log("update error", err)
        })

        

    }

    return(
       
           <form onSubmit={submitHandler}>
               <input
                  name="title"
                  type = "text"
                  value={movie.title}
                  onChange = {changeHandler}
                  />
               <input
                  name="director"
                  type = "text"
                  value={movie.director}
                  onChange = {changeHandler}

                  />
               <input
                  name="metascore"
                  type = "text"
                  value={movie.metascore}
                  onChange = {changeHandler}
                  
                  />
                <button>submit</button>
           </form>
           
    )
}

export default UpdateMovie