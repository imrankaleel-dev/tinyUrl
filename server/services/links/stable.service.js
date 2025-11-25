const links = require("../../database/links.database");

const getRedirectionUrl = async (shortLink) => {
  const res = await links.getRecordByShortUrl(shortLink);

  if (!res) {
    throw Error("not found");
  }

  return res.real;
};

const updateRedirectCount = async (shortLink) => {
  await links.increaseRedirectionCount(shortLink);
};

module.exports = {
  getRedirectionUrl,
  updateRedirectCount,
};
