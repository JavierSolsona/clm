const logger = require('pino')();

const MovieModel = require('../models/movie');
const { YEAR, INDEX } = require('../constants/headers');
const { MOVIES_PER_PAGE } = require('../constants/app');
const {
  MOVIE_NOT_FOUND,
  ERROR_CREATING_MOVIE,
  REQUEST_API_ERROR,
  ERROR_DATA
} = require('../constants/errors');
const {
  getMovie,
  getMovieFromAPI,
  storeMovie
} = require('../services/movies-service');
const { headerFind, headerFindAll, bodyReplace } = require('../validators/movies-validator');

exports.find = async (ctx) => {
  const { error, value } = headerFind.validate(ctx.request.headers[YEAR]);
  
  if (error) {
    ctx.body = { error: ERROR_DATA };
    logger.info({ error: ERROR_DATA });
    return ctx;
  }
  
  let movie = await getMovie(ctx);
  
  if (movie.length > 0) {
    ctx.body = { movie: movie };
    return ctx; 
  }
  
  const movieAPI = await getMovieFromAPI(ctx);

  if (movieAPI === REQUEST_API_ERROR || movieAPI === MOVIE_NOT_FOUND) {
    ctx.body = { error: movieAPI };
    logger.info({ error: movieAPI });
    return ctx;
  }
  
  movie = storeMovie(movieAPI);
  
  if (movie === ERROR_CREATING_MOVIE) {
    ctx.body = { error: ERROR_CREATING_MOVIE };
    logger.info({ error: ERROR_CREATING_MOVIE });
    return ctx;
  }
  
  ctx.body = { movie: movie };
  return ctx;
};

exports.findAll = async (ctx) => {
  const { error, value } = headerFindAll.validate(ctx.request.headers);
  
  if (error) {
    ctx.body = { error: ERROR_DATA };
    logger.info({ error: ERROR_DATA });
    return ctx;
  }
  
  ctx.body = { movie: await MovieModel.find().limit(MOVIES_PER_PAGE).skip(MOVIES_PER_PAGE * ctx.request.headers[INDEX]) };
  return ctx;
};

exports.replace = async (ctx) => {
  const { error, value } = bodyReplace.validate(ctx.request.body);
  
  if (error) {
    ctx.body = { error: ERROR_DATA };
    logger.info({ error: ERROR_DATA });
    return ctx;
  }
  
  let movie = await MovieModel.findOne({Title: { $regex : new RegExp(ctx.request.body.movie, 'i') }});
  
  if (!movie) {
    ctx.body = { error: MOVIE_NOT_FOUND };
    logger.info({ error: MOVIE_NOT_FOUND });
    return ctx;
  }
  
  const { find, replace } = ctx.request.body;
  
  ctx.body = {
    plot: movie.Plot.replace(new RegExp(find, 'ig'), replace)
  };
  
  return ctx;
};