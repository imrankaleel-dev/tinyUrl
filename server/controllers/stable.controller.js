const { responseStatus } = require("../constants/response.constants");
const {
  getRedirectionUrl,
  updateRedirectCount,
} = require("../services/links/stable.service");

const linkRedirection = async (req, res) => {
  try {
    const { code: shortLink } = req.params;

    const realLink = await getRedirectionUrl(shortLink);

    res.redirect(realLink); // default 302

    // for faster response increase redirection count after response
    await updateRedirectCount(shortLink);
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

const healthCheck = async (req, res) => {
  try {
    return res.status(200).json();
  } catch (error) {
    console.log(error.message);

    res.status(400).json({
      status: responseStatus.failed,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  linkRedirection,
  healthCheck,
};
