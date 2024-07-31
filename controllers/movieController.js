const Movie = require('../models/movie');

// Get all movies
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single movie by ID
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findOne({ Id: req.params.id });
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new movie
const createMovie = async (req, res) => {
  const movie = new Movie({
    Id: req.body.Id,
    Title: req.body.Title,
    Runtime: req.body.Runtime,
    Year: req.body.Year,
    Director: req.body.Director,
    Country: req.body.Country,
    Cast: req.body.Cast,
    Genre: req.body.Genre,
    Synopsis: req.body.Synopsis,
  });

  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a movie
const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findOne({ Id: req.params.id });
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    if (req.body.Title != null) movie.Title = req.body.Title;
    if (req.body.Runtime != null) movie.Runtime = req.body.Runtime;
    if (req.body.Year != null) movie.Year = req.body.Year;
    if (req.body.Director != null) movie.Director = req.body.Director;
    if (req.body.Country != null) movie.Country = req.body.Country;
    if (req.body.Cast != null) movie.Cast = req.body.Cast;
    if (req.body.Genre != null) movie.Genre = req.body.Genre;
    if (req.body.Synopsis != null) movie.Synopsis = req.body.Synopsis;

    const updatedMovie = await movie.save();
    res.json(updatedMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a movie
const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findOne({ Id: req.params.id });
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    await movie.remove();
    res.json({ message: 'Movie deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};
