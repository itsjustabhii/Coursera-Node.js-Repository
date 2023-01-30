const express = require("express");
const router = express.Router();

router
  .route("/")
  .get((req, res, next) => {
    console.log("Code to handle all GET request for promotions");
  })
  .post((req, res, next) => {
    console.log("code to handle POST request for a new promotion");
  })
  .put((req, res, next) => {
    console.log("code to handle PUT request for a new promotion");
  })
  .delete((req, res, next) => {
    console.log("code to handle DELETE request for a new promotion");
  });

router
  .route("/:promoId")
  .get((req, res, next) => {
    console.log("code to handle GET request for a specific promotion");
  })
  .put((req, res, next) => {
    console.log("code to handle PUT request for a specific promotion");
  })
  .delete((req, res, next) => {
    console.log("code to handle DELETE request for a specific promotion");
  });

module.exports = router;
