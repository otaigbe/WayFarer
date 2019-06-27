export default class Queries {
  static get insertNewUser() {
    return 'INSERT into users (firstname, lastname, password, email, isadmin) VALUES ($1, $2, $3, $4, $5) returning *';
  }

  static get checkIfEmailExists() {
    return 'SELECT * FROM users WHERE email = $1';
  }

}
