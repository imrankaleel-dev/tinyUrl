const express = require("express");

// import constants
const linkRouteConstants = require("../constants/routes/links.routes.constants");

// import controller
const linkController = require("../controllers/links.controller");

// import middleware
const { validate } = require("../middleware/validator");

// schema
const {
  createLinkSchema,
} = require("../validator/schema/links/createLinks.schema");

const router = express.Router();

router.post(
  linkRouteConstants.createLinks,
  validate(createLinkSchema),
  linkController.newLink
);

router.get(linkRouteConstants.getAllLinks, linkController.getLinks);

router.get(linkRouteConstants.getLinkStats, linkController.linkStats);

router.delete(linkRouteConstants.deleteLink, linkController.deleteLink);

module.exports = router;
