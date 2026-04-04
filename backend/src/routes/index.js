const express = require("express");

const concertRoutes = require("./v1/concertRoutes");

const router = express.Router();

router.use("/v1/concert", concertRoutes);

module.exports = router;