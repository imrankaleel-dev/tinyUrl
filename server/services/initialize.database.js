const databaseInit = require("../database/init.database");

const initializeDatabase = async () => {
  await databaseInit.createLinksTable();
};

module.exports = initializeDatabase;
