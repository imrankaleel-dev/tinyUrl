const links = require("../../database/links.database");

const addNewLinks = async (link) => {
  const res = await links.insertRecord(link);

  return {
    real: res.rows[0].real,
    short: res.rows[0].short,
  };
};

const getAllLinks = async () => {
  const res = await links.getRecords();

  return res.rows;
};

const linkDelete = async (shortLink) => {
  await links.removeRecord(shortLink);
};

const getLinkStats = async (shortLink) => {
  const res = await links.getRecordByShortUrl(shortLink);

  if (!res) {
    throw Error("not found");
  }

  return {
    real: res.real,
    short: res.short,
    createAt: res.create_at,
    accessCount: res.access_count,
    lastAccess: res.last_access,
  };
};

module.exports = {
  addNewLinks,
  getAllLinks,
  linkDelete,
  getLinkStats,
};
