import conf from 'dotenv';
import pool from './dbConnect';

conf.config();

const createSchema = () => {
  const createTripStatus = 'CREATE TYPE tripstatus AS ENUM(\'active\', \'cancelled\')';

  const createUserTable = `CREATE TABLE IF NOT EXISTS users (
        id bigserial PRIMARY KEY UNIQUE NOT NULL,
        firstname VARCHAR(200) NOT NULL,
        lastname VARCHAR(200) NOT NULL,
        password VARCHAR(500) NOT NULL,
        email VARCHAR(200) UNIQUE NOT NULL,
        isadmin BOOLEAN NOT NULL
    )`;

  const createBusesTable = `CREATE TABLE IF NOT EXISTS buses (
        id bigserial PRIMARY KEY UNIQUE NOT NULL,
        platenumber VARCHAR(200) NOT NULL,
        manufacturer VARCHAR(200) NOT NULL,
        model VARCHAR(200) NOT NULL,
        year INTEGER NOT NULL,
        capacity INTEGER NOT NULL,
        vinnumber VARCHAR(200) UNIQUE NOT NULL
        )`;

  const createTripsTable = `CREATE TABLE IF NOT EXISTS trips (
        id bigserial PRIMARY KEY UNIQUE NOT NULL,
        busid INTEGER NOT NULL,
        origin VARCHAR(200) NOT NULL,
        destination VARCHAR(200) NOT NULL,
        tripdate DATE NOT NULL,
        vehiclecapacity INTEGER NOT NULL,
        occupiedspaces INTEGER[],
        fare FLOAT NOT NULL,
        status tripstatus NOT NULL
   )`;
  const createBookingsTable = `CREATE TABLE IF NOT EXISTS bookings (
        id bigserial PRIMARY KEY UNIQUE NOT NULL,
        tripid INTEGER NOT NULL,
        userid INTEGER NOT NULL,
        createdon DATE NOT NULL
   )`;
  pool.connect(async (err, client) => {
    if (err) console.log(err);
    try {
      await client.query('DROP TYPE IF EXISTS tripstatus cascade');
      await client.query('DROP TABLE IF EXISTS users, buses, trips, bookings cascade');
      await client.query(createTripStatus);
      await client.query(createUserTable);
      await client.query(createBusesTable);
      await client.query(createTripsTable);
      await client.query(createBookingsTable);

      console.log('Tables created and Populated');
    } catch (error) {
      console.log(error);
    }
    client.release();
    process.exit();
  });
};

createSchema();
