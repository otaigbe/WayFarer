import pg from 'pg';
import conf from 'dotenv';

conf.config();

let connectionString = process.env.PGDATABASE_DEVELOPMENT;

if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.PGDATABASE_TEST;
}

if (process.env.NODE_ENV === 'production') {
  connectionString = process.env.PGDATABASE_PRODUCTION;
}
const config = {
  connectionString,
};

const pool = new pg.Pool(config);

export default pool;
