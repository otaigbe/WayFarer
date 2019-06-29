export default class Queries {
  static get insertNewUser() {
    return 'INSERT into users (firstname, lastname, password, email, isadmin) VALUES ($1, $2, $3, $4, $5) returning *';
  }

  static get checkIfEmailExists() {
    return 'SELECT * FROM users WHERE email = $1';
  }

  static get createTrip() {
    return 'INSERT into trips (busid, origin, destination, tripdate, fare, status) vALUES ($1, $2, $3, $4, $5, $6) returning *';
  }

  static get checkIfATripAlreadyExists() {
    return 'SELECT * FROM trips WHERE busid = $1 AND tripdate = $2';
  }

  static get getAllTrips() {
    return 'SELECT * FROM trips LIMIT  $1 OFFSET $2';
  }

}
