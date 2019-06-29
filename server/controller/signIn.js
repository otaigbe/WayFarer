/* eslint-disable consistent-return */
import Joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import schema from '../helper/schema';
import errorHandler from '../helper/errorHandler';
import response from '../helper/responseSchema';
import queries from '../model/queries';
import helper from '../helper/helper';

export default class SigninController {
  /**
   * @async
   * @method - This gives a user/admin access to his/her account
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} Success or failure message
   */
  static async signIn(req, res) {
    const result = Joi.validate(req.body, schema.signInSchema, { convert: false });
    if (result.error === null) {
      const { email, password } = req.body;
      const dbOperationResult = await helper.wrapDbOperationInTryCatchBlock(res, queries.checkIfEmailExists, [email]);
      if (dbOperationResult.rowCount === 1) {
        const validPassword = await bcrypt.compare(password, dbOperationResult.rows[0].password);
        if (!validPassword) {
          return res.status(400).json(response.failure('Invalid username or password.', {}));
        }
        const { id, firstname, isadmin } = dbOperationResult.rows[0];
        const token = jwt.sign({
          id, firstname, isadmin, email,
        }, process.env.SECRETKEY);
        res.set('x-auth-token', token);
        return res.status(200).json(response.success(`Welcome! ${firstname}`, {
          id, firstname, isadmin, email, token,
        }));
      }
      return res.status(404).json(response.failure('Something wrong with username or password', {}));
    }
    errorHandler.validationError(res, result);
  }
}
