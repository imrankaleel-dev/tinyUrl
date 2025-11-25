const { responseStatus } = require("../constants/response.constants");
const {
  addNewLinks,
  getAllLinks,
  linkDelete,
  getLinkStats,
} = require("../services/links/links.service");

const newLink = async (req, res) => {
  try {
    const { link } = req.body;

    const result = await addNewLinks(link);

    res.status(200).json({
      status: responseStatus.success,
      result: result,
    });
  } catch (error) {
    console.log(error.message);

    if (error.code === "23505") {
      res.status(409).json({
        status: responseStatus.failed,
        message: "link already exists",
      });
    }

    res.status(400).json({
      status: responseStatus.failed,
      message: "Something went wrong",
    });
  }
};

const getLinks = async (req, res) => {
  try {
    const allLinks = await getAllLinks();

    res.status(200).json({
      status: responseStatus.success,
      result: allLinks,
    });
  } catch (error) {
    res.status(400).json({
      status: responseStatus.failed,
      message: "Something went wrong",
    });
  }
};

const deleteLink = async (req, res) => {
  try {
    const { code: link } = req.params;

    await linkDelete(link);

    res.status(200).json({
      status: responseStatus.success,
    });
  } catch (error) {
    console.log(error.message);

    res.status(400).json({
      status: responseStatus.failed,
      message: "Something went wrong",
    });
  }
};

const linkStats = async (req, res) => {
  try {
    const { code: link } = req.params;

    const stats = await getLinkStats(link);

    res.status(200).json({
      status: responseStatus.success,
      result: stats,
    });
  } catch (error) {
    console.log(error.message);

    if (error.message === "not found") {
      res.status(404).send();
    }

    res.status(400).json({
      status: responseStatus.failed,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  newLink,
  getLinks,
  deleteLink,
  linkStats,
};
