const { pool } = require("./db");

const createLinksTable = async () => {
  const client = await pool.connect();
  try {
    const functionCreateQuery = `
    CREATE OR REPLACE FUNCTION generate_short_code(length INT DEFAULT 6)
      RETURNS TEXT AS $$
      DECLARE
          chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          result TEXT := '';
      BEGIN
          FOR i IN 1..length LOOP
              result := result || substr(chars, floor(random() * length(chars))::int + 1, 1);
          END LOOP;
          RETURN result;
      END;
      $$ LANGUAGE plpgsql;`;

    const tableCreateQuery = `
      CREATE TABLE IF NOT EXISTS links (
        id SERIAL PRIMARY KEY,
        real VARCHAR UNIQUE NOT NULL,
        short VARCHAR(6) UNIQUE NOT NULL DEFAULT generate_short_code(6),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        access_count INT DEFAULT 0,
        last_access TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await client.query(functionCreateQuery);
    await client.query(tableCreateQuery);
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

module.exports = { createLinksTable };
