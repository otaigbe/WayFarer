/* eslint-disable consistent-return */
import Joi from 'joi';
import schema from '../helper/schema';
import errorHandler from '../helper/errorHandler';
import helper from '../helper/helper';
import queries from '../model/queries';
import response from '../helper/responseSchema';

export default class Trips {
  /**
   * @async
   * @method - This method creates a trip
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {JSON} - containing the status message and any addition data required if any
   */
  static async createTrip(req, res) {
    const result = Joi.validate(req.body, schema.createTripSchema, { convert: true });
    if (result.error === null) {
      const { isadmin } = req.user;
      const {
        busid, origin, tripdate, destination, fare, status,
      } = req.body;
      if (isadmin === true) {
        const dbOperationResult2 = await helper.wrapDbOperationInTryCatchBlock(res, queries.checkIfATripAlreadyExists, [busid, tripdate]);
        if (dbOperationResult2.rowCount === 0) {
          const dbOperationResult = await helper.wrapDbOperationInTryCatchBlock(res, queries.createTrip, [busid, origin, destination, tripdate, fare, status]);
          return res.status(201).json(response.success('Trip successfully created', dbOperationResult.rows[0]));
        }
        return res.status(409).json(response.failure(`There is a trip already set for ${tripdate} and with busid: ${busid}`, {}));
      }
      return res.status(401).json(response.failure('You are not authorized to create a trip', {}));
    }
    errorHandler.validationError(res, result);
  }


  /**
   * @async
   * @method - This method retrieves all trips
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {JSON} - containing the status message and an array of all trips
   */
  static async getAllTrips(req, res) {
    if ((req.query.page == undefined || req.query.page === 0) && req.query.quantity == undefined) {
      req.query.page = 1;
      req.query.quantity = 5;
    }
    const result = Joi.validate(req.query, schema.getAllTripsSchema, { convert: true });
    if (result.error === null) {
      const { page, quantity } = req.query;
      const offset = (page - 1) * quantity;
      const dbOperationResult = await helper.wrapDbOperationInTryCatchBlock(res, queries.getAllTrips, [quantity, offset]);
      return res.status(200).json(response.success(`All Trips. Page ${page}`, dbOperationResult.rows));
    }
    errorHandler.validationError(res, result);
  }
}
