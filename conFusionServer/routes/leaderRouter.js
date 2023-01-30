const express = require("express");
const router = express.Router();

router
  .route("/")
  .get((req, res, next) => {
    console.log("code to handle GET request for all leaders");
  })
  .post((req, res, next) => {
    console.log("code to handle POST request for a new leader");
  })
  .put((req, res, next) => {
    console.log("code to handle PUT request for a new leader");
  })
  .delete((req, res, next) => {
    console.log("code to handle DELETE request for a new leader");
  });

router
  .route("/:leaderId")
  .get((req, res, next) => {
    console.log("code to handle GET request for a specific leader");
  })
  .post((req, res, next) => {
    console.log("code to handle POST request for a specific leader");
  })
  .put((req, res, next) => {
    console.log("code to handle PUT request for a specific leader");
  })
  .delete((req, res, next) => {
    console.log("code to handle DELETE request for a specific leader");
  });

module.exports = router;
