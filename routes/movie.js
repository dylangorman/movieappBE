const router = require("express").Router();

const { Movie, User, Subscription } = require("../models/user");
// const { movie } = require("pg/lib/defaults");
//============================= add (POST/CREATE)one movie==================================//
//a route to add a movie to a movie table
router.post("/addmovie", async (req, res) => {
  const movie = await Movie.create({
    title: req.body.title,
    actor: req.body.actor,
    year: req.body.year,
  });
  res.status(200).json({ msg: movie });
});
//============================ find (GET/READ)all movies =================================//
router.get("/getall", async (req, res) => {
  const allMovies = await Movie.findAll({});
  res.status(200).json({ movies: allMovies });
});
//============================ find (GET/READ)one movie ====================================//
router.get("/", async (req, res) => {
  const movie = await Movie.findOne({ where: { id: req.body.title } });
  res.status(200).json(movie);
});

// =========================== delete (DELETE)one movie =================================== //
router.delete("/:id", async (req, res) => {
  const movie = await Movie.destroy({ where: { id: req.params.id } });
  // const deletedMovie = await movie.destroy();
  // console.log(deletedMovie);
  res
    .status(200)
    .json({ msg: `${req.params.id} has been deleted from the database` });
});

// //===================================== delete (DELETE) all ======================================//
router.delete("/", async (req, res) => {
  const allMovies = await Movie.destroy({
    where: {},
    truncate: false,
  });
  res.status(201).json({ msg: "Deleted All Movies" });
});
module.exports = router;
