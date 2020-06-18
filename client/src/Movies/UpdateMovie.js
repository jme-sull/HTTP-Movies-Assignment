import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'

const initalMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const UpdateMovie = (props) => {

   const [ updateMovie, setUpdateMovie ] = useState(initalMovie)
   const { id } = useParams();
   const { push } = useHistory();

   useEffect(() => {
       axios
       .get(`http://localhost:5000/api/movies/${id}`)
       .then(res => {
           setUpdateMovie(res.data)
       })
       .catch(err => console.log(err))
   }, [id])
   
   const changeHandler = (evt) => {
    const name = evt.target.name
    const value = evt.target.value

    setUpdateMovie({
        ...updateMovie,
        [name]: value 
    })
}

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, updateMovie)
        .then(res => {
            setUpdateMovie(res.data)
            push(`/`)
        })
        .catch(err => console.log(err))
    }
   

    return (
        <div>
            <h2>Update Movie</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        onChange={changeHandler}
                        placeholder="title"
                        value={updateMovie.title}
                    />
            
                    <input
                        type="text"
                        name="director"
                        onChange={changeHandler}
                        placeholder="director"
                        value={updateMovie.director}
                    />
  
                    <input
                        type="text"
                        name="metascore"
                        onChange={changeHandler}
                        placeholder="metascore"
                        value={updateMovie.metascore}
                    />
   
  
                    <input
                        type="text"
                        name="stars"
                        onChange={changeHandler}
                        placeholder="stars"
                        value={updateMovie.stars}
                    />
     
          <button>Update Movie</button>
        </form>
    </div>

    )
}

export default UpdateMovie