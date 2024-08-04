// routes/showRoutes.js
const express = require("express");
const router = express.Router();
const showsController = require("../src/shows/showsController");

router.route("/fetchShows").post(showsController.fetchShowsController);

// Route for fetching show details
router.route("/:id").get(showsController.fetchShowDetailsController);

module.exports = router;
