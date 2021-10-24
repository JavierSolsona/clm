const axios = require('axios');

const MovieModel = require('../models/movie');
const { YEAR } = require('../constants/headers');
const { OMDB } = require('../constants/urls');
const {
  MOVIE_NOT_FOUND,
  ERROR_CREATING_MOVIE,
  REQUEST_API_ERROR
} = require('../constants/errors');

exports.getMovie = async (ctx) => {
  const search = {
    Title: { $regex : new RegExp(ctx.params.title, 'i') }
  }
  
  if (ctx.request.headers[YEAR]) {
    search.Year = ctx.request.headers[YEAR];
  }
  
  return await MovieModel.find(search);
}

exports.getMovieFromAPI = async (ctx) => {
  let searchYear = '';
  
  if (ctx.request.headers[YEAR]) {
    searchYear = `&y=${ctx.request.headers[YEAR]}`;
  }
  
  return await axios.get(`${OMDB}&t=${ctx.params.title}${searchYear}`)
    .then(response => {
      if (response.data.Error) {
        return MOVIE_NOT_FOUND;
      }
      
      return response.data;
    })
    .catch(error => {
      return REQUEST_API_ERROR;
    });
}

exports.storeMovie = (movieAPI) => {
  const movie = new MovieModel({
    Title: movieAPI.Title,
    Year: movieAPI.Year,
    Released: movieAPI.Released,
    Genre: movieAPI.Genre,
    Director: movieAPI.Director,
    Actors: movieAPI.Actors,
    Plot: movieAPI.Plot,
    Ratings: movieAPI.Ratings
  });

  movie.save(function (err) {
    if (err) {
      return ERROR_CREATING_MOVIE;
    }
  })
  
  return movie;
}