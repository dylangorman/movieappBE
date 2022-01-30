const router = require("express").Router();

const { Movie } = require("../models/user");
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
router.get("/getallmovies", async (req, res) => {
  const allMovies = await Movie.findAll({});
  res.status(200).json(allMovies);
});
//============================ find (GET/READ)one movie ====================================//
router.get("/:id", async (req, res) => {
  const movie = await Movie.findOne({ where: { id: req.params.id } });
  res.status(200).json({ msg: movie });
});

// =========================== delete (DELETE)one movie =================================== //
router.delete("/:id", async (req, res) => {
  const movie = await Movie.findOne({ where: { id: req.params.id } });
  const deletedMovie = await movie.destroy();
  console.log(deletedMovie);
  res.status(200).json({ msg: deletedMovie });
});

// //===================================== delete (DELETE) all ======================================//
router.delete("/deleteallmovies", async (req, res) => {
  const deletedMovie = await Movie.destroy({ where: {} });
  console.log(deletedMovie);
  res.status(200).json({ msg: `Deleted ${deletedMovie}` });
});
module.exports = router;
