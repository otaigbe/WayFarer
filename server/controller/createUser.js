/* eslint-disable consistent-return */
import Joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import schema from '../helper/schema';
import errorHandler from '../helper/errorHandler';
import response from '../helper/responseSchema';
import queries from '../model/queries';
import helper from '../helper/helper';

export default class CreateUser {
  /**
   * @method - This creates a new account for a user
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {JSON} Success or failure message
   */
  static async signUp(req, res) {
    if (req.body.isadmin === 'true') { req.body.isadmin = true; } else { req.body.isadmin = false; }
    const result = Joi.validate(req.body, schema.userSchema, { convert: false });
    if (result.error === null) {
      const { password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const {
        firstname, lastname, email, isadmin,
      } = req.body;
      const dbOperationResult = await helper.wrapDbOperationInTryCatchBlock(res, queries.checkIfEmailExists, [email]);
      if (dbOperationResult.rowCount === 0) {
        const args = [firstname, lastname, hashedPassword, email, isadmin];
        const dbOperationResult2 = await helper.wrapDbOperationInTryCatchBlock(res, queries.insertNewUser, args);
        const { id } = dbOperationResult2.rows[0];
        const token = jwt.sign({ id, email, firstname, isadmin }, process.env.SECRETKEY);
        dbOperationResult2.rows[0].token = token;
        res.set('x-auth-token', token);
        return res.status(201).json(response.success('Signup Successful!Login With your new email', dbOperationResult2.rows[0]));
      }
      return res.status(409).json(response.failure('chosen username/email already exists, choose a unique username.', {}));
    }
    errorHandler.validationError(res, result);
  }
}
