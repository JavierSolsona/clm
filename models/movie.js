const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ratingSchema = new Schema({ Source: String, Value: String });

const MovieModelSchema = new Schema({
  Title: { type: String, index: { unique: true } },
  Year: String,
  Released: String,
  Genre: String,
  Director: String,
  Actors: String,
  Plot: String,
  Ratings: [ratingSchema]
});

module.exports = mongoose.model('MovieModel', MovieModelSchema );
