const express = require("express");
const router = express.Router();
const Favorites = require("../models/favorites");
const authenticate = require("../authenticate");

// GET all favorites with user and dishes info populated
router.get("/", authenticate.verifyUser, async (req, res, next) => {
  try {
    const favorites = await Favorites.findOne({ user: req.user._id })
      .populate("user")
      .populate("dishes");
    res.status(200).json(favorites);
  } catch (error) {
    next(error);
  }
});

// POST a new favorite and add dishes to the user's list of favorites
router.post("/", authenticate.verifyUser, async (req, res, next) => {
  try {
    const favorite = await Favorites.findOne({ user: req.user._id });

    if (!favorite) {
      // create a new favorite document if one does not exist
      const newFavorite = new Favorites({
        user: req.user._id,
        dishes: req.body,
      });
      const savedFavorite = await newFavorite.save();
      res.status(201).json(savedFavorite);
    } else {
      // add new dishes to the list of favorite dishes for the user
      req.body.forEach((dish) => {
        if (favorite.dishes.indexOf(dish._id) === -1) {
          favorite.dishes.push(dish._id);
        }
      });

      const savedFavorite = await favorite.save();
      res.status(201).json(savedFavorite);
    }
  } catch (error) {
    next(error);
  }
});

// DELETE all favorites for the user
router.delete("/", authenticate.verifyUser, async (req, res, next) => {
  try {
    const result = await Favorites.deleteOne({ user: req.user._id });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

// POST a new favorite dish for the user
router.post("/:dishId", authenticate.verifyUser, async (req, res, next) => {
  try {
    const favorite = await Favorites.findOne({ user: req.user._id });

    if (!favorite) {
      // create a new favorite document if one does not exist
      const newFavorite = new Favorites({
        user: req.user._id,
        dishes: [req.params.dishId],
      });
      const savedFavorite = await newFavorite.save();
      res.status(201).json(savedFavorite);
    } else {
      // add new dish to the list of favorite dishes for the user
      if (favorite.dishes.indexOf(req.params.dishId) === -1) {
        favorite.dishes.push(req.params.dishId);
      }

      const savedFavorite = await favorite.save();
      res.status(201).json(savedFavorite);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
