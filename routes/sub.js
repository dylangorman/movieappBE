const { User, Movie, Subscription } = require("../models/user");
const router = require("express").Router();
const { Sequelize, DataTypes } = require("sequelize");

//===================================== add one subscription ======================================//
router.post("/:id/", async (req, res) => {
  const desiredmovie = await Movie.findOne({
    where: { title: req.body.title },
  });

  const subscription = await Subscription.create({
    user_id: req.params.id,
    movie_id: desiredmovie.id,
    movie_title: desiredmovie.title,
    movie_actor: desiredmovie.actor,
    movie_year: desiredmovie.year,
  });

  const list = await Subscription.findAll({
    where: { user_id: req.params.id },
  });
  res.status(201).json(list);
});

//===================================== find all subscriptions  ======================================//
router.get("/:id", async (req, res) => {
  const allsubs = await Subscription.findAll({
    where: { user_id: req.params.id },
  });
  res.status(200).json(allsubs);
});

//===================================== delete one subscription ======================================//
router.delete("/:id/:movieid", async (req, res) => {
  await Subscription.destroy({
    where: Sequelize.and(
      { user_id: req.params.id },
      { movie_id: req.params.movieid }
    ),
  });
  const data = await Subscription.findAll({
    where: { user_id: req.params.id },
  });

  res.status(200).json(data);
});

module.exports = router;
