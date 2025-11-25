const express = require("express");

// import constants
const stableRouteConstants = require("../constants/routes/stable.routes.constants");

// import controller
const stableController = require("../controllers/stable.controller");

const router = express.Router();

router.get(stableRouteConstants.redirect, stableController.linkRedirection);
router.get(stableRouteConstants.healthz, stableController.healthCheck);

module.exports = router;
