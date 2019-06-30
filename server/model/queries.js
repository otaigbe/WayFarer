export default class Queries {
  static get insertNewUser() {
    return 'INSERT into users (firstname, lastname, password, email, isadmin) VALUES ($1, $2, $3, $4, $5) returning *';
  }

  static get checkIfEmailExists() {
    return 'SELECT * FROM users WHERE email = $1';
  }

  static get createTrip() {
    return 'INSERT into trips (busid, origin, destination, tripdate, vehiclecapacity, fare, status) vALUES ($1, $2, $3, $4, $5, $6, $7) returning *';
  }

  static get checkIfATripAlreadyExists() {
    return 'SELECT * FROM trips WHERE busid = $1 AND tripdate = $2';
  }

  static get getAllTrips() {
    return 'SELECT * FROM trips LIMIT  $1 OFFSET $2';
  }

  static get checkIfABusAlreadyExists() {
    return 'SELECT * FROM buses WHERE platenumber = $1 OR vinnumber = $2';
  }

  static get registerBus() {
    return 'INSERT INTO buses (platenumber, manufacturer, model, capacity, year, vinnumber) VALUES ($1, $2, $3, $4, $5, $6) returning *';
  }

  static get retrieveBusCapacity() {
    return 'SELECT capacity from buses WHERE id = $1';
  }

}
