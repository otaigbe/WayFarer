/* eslint-disable default-case */
import { check, body, validationResult } from 'express-validator';

export default class Sanitizer {
/**
   * @param {object} req client request Object
   * @param {object} res server response object
   * @param {object} next control structure to continue processing
   * @returns {JSON}
   */
  static sanitizeUserBioData() {
    return [
      check('password').trim(),
      check('email').isEmail().trim().normalizeEmail(),
      check('firstname').trim(),
      check('lastname').trim(),
      check('isadmin').trim(),
    ];
  }
}
