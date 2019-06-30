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

  /**
   * @param {object} req client request Object
   * @param {object} res server response object
   * @param {object} next control structure to continue processing
   * @returns {JSON}
   */
  static sanitizeUserSignInData() {
    return [
      check('password').trim(),
      check('email').isEmail().trim().normalizeEmail(),
    ];
  }

  /**
   * @param {object} req client request Object
   * @param {object} res server response object
   * @param {object} next control structure to continue processing
   * @returns {JSON}
   */
  static sanitizeCreateTripData() {
    return [
      check('busid').trim().isInt(),
      check('origin').trim(),
      check('tripdate').trim(),
      check('destination').trim(),
      check('fare').trim().isFloat(),
      check('status').trim(),
    ];
  }

  /**
   * @param {object} req client request Object
   * @param {object} res server response object
   * @param {object} next control structure to continue processing
   * @returns {JSON}
   */
  static sanitizeTripQueries() {
    return [
      check('page').isInt(),
      check('quantity').isInt(),
    ];
  }

  /**
   * @param {object} req client request Object
   * @param {object} res server response object
   * @param {object} next control structure to continue processing
   * @returns {JSON}
   */
  static sanitizeBusData() {
    return [
      check('platenumber').trim(),
      check('manufacturer').trim(),
      check('model').trim(),
      check('year').trim(),
      check('capacity').trim(),
      check('vinnumber').trim(),
    ];
  }
}
