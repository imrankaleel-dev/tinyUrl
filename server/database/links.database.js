const { pool } = require("./db");

const insertRecord = async (link) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `INSERT INTO links (real) VALUES ($1) RETURNING *`,
      [link]
    );

    return result;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

const getRecords = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query(`select * from links`);

    return result;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

const getRecordByShortUrl = async (shortUrl) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT * FROM links WHERE short = $1 LIMIT 1",
      [shortUrl]
    );

    return result.rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

const increaseRedirectionCount = async (shortUrl) => {
  const client = await pool.connect();
  try {
    await client.query(
      `UPDATE links 
        SET 
            access_count = access_count + 1,
            last_access = NOW()
        WHERE short = $1
        `,
      [shortUrl]
    );
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

const removeRecord = async (shortLink) => {
  const client = await pool.connect();
  try {
    await client.query(`DELETE from links WHERE short = $1`, [shortLink]);
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  insertRecord,
  getRecords,
  getRecordByShortUrl,
  increaseRedirectionCount,
  removeRecord,
};
