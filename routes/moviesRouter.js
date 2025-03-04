import {Router} from 'express'
import movies from '../data/movies.js'

const moviesRouter = Router()

moviesRouter.get('/movies', (request, response) => {
    return response.json(movies)
})

moviesRouter.get('/movies/:id', (request, response) => {
    const movieID = request.params.id
    // I save into a variable the value of the params
    const movieByID = movies.find(movie => movie.id === parseInt(movieID) )
    // I search in the array where I do have an object with his ID matching the request.params.id
    if(!movieByID){
        return response.status(404).json({message : `Movie not found`})
    }
    // If I do not find a movie I send an error
    return response.status(200).json(movieByID)
    // I return the movieByID
})

moviesRouter.post('/movies', (request, response) => {
    const {title, genre} = request.body
    if(!title, !genre){
        response.status(400).json({message : 'All fields are required'})
    }
    const newMovie = {
        id : movies.length + 1,
        title,
        genre
    }
    movies.push(newMovie)
    return response.status(201).json(newMovie)
})


export default moviesRouter