const sql = require('../db');

class User {
  constructor(user) {
    this.USER_ID = user.USER_ID;
    this.USER_NAME = user.USER_NAME;
    this.PHONE_NO = user.PHONE_NO;
    this.PASSWORD = user.PASSWORD;
    this.USER_TYPE = user.USER_TYPE || 'A';
    this.SALT = user.SALT;
  }

  static create(user, result) {
    sql.query('INSERT INTO USER SET ?', user, (sqlErr, res) => {
      if (sqlErr) {
        result(sqlErr, null);
      } else { // if (res.affectedRows) {
        result(null, res);
      }
    });
  }

  static find(user, result) {
    const query = `SELECT USER_ID, USER_NAME, PHONE_NO, ORG_CODE, PASSWORD, SALT FROM USER
    WHERE USER_ID = ?`;

    sql.query(query, user.USER_ID, (err, res) => {
      console.log(res);
      if (err) {
        result(err, null);
      }

      if (res.length) {
        result(null, res);
      } else {
        result('Invalid user information. Please check again.', res);
      }
    });
  }
}

module.exports = User;
