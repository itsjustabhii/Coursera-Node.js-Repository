const express = require("express");
const mongoose = require("mognoose");
const bodyParser = require("body-parser");
const Promotions = require("../models/promotions");
const promoRouter = express.Router();
const authenticate = require("../authenticate");
const cors = require("./cors");

promoRouter.use(bodyParser.json());

promoRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get((req, res, next) => {
    Promotions.find({})
      .then(
        (promotions) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(promotions);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser(), (req, res, next) => {
    Promotions.create(req.body).then(
      (promotion) => {
        console.log("leader created ", promotion);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(promotion);
      },
      (err) => next(err).catch((err) => next(err))
    );
  })

  .put(cors.corsWithOptions, authenticate.verifyUser(), (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /Promotions");
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser(), (req, res, next) => {
    Promotions.remove({}).then(
      (resp) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(resp);
      },
      (err) => next(err).catch((err) => next(err))
    );
  });

promoRouter
  .route("/:promoId")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get((req, res, next) => {
    Promotions.findById(req.params.leaderId).then(
      (promotions) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(promotions);
      },
      (err) => next(err).catch((err) => next(err))
    );
  })
  .post(cors.corsWithOptions, authenticate.verifyUser(), (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /Promotions/" + req.params.promoId);
  })
  .put(cors.corsWithOptions, authenticate.verifyUser(), (req, res, next) => {
    Promotions.findByIdAndUpdate(
      req.params.promoId,
      {
        $set: req.body,
      },
      { new: true }
    ).then(
      (promotion) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(promotion);
      },
      (err) => next(err).catch((err) => next(err))
    );
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser(), (req, res, next) => {
    Promotions.findByIdAndRemove(req.params.promoId).then(
      (resp) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(resp);
      },
      (err) => next(err).catch((err) => next(err))
    );
  });

module.exports = promoRouter;
