import Joi from 'joi';
import schema from '../helper/schema';
import errorHandler from '../helper/errorHandler';
import response from '../helper/responseSchema';
import queries from '../model/queries';
import helper from '../helper/helper';

export default class BusController {
/**
   * @async
   * @method - This method registers a bus
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {JSON} - containing the status message and any addition data required if any
   */
  static async registerBus(req, res) {
    const result = Joi.validate(req.body, schema.registerBusSchema, { convert: true });
    if (result.error === null) {
      const { isadmin } = req.user;
      const { platenumber, manufacturer, model, capacity, year, vinnumber } = req.body;
      if (isadmin === true) {
        const dbOperationResult = await helper.wrapDbOperationInTryCatchBlock(res, queries.checkIfABusAlreadyExists, [platenumber, vinnumber]);
        if (dbOperationResult.rowCount === 0) {
          const dbOperationResult2 = await helper.wrapDbOperationInTryCatchBlock(res, queries.registerBus, [platenumber, manufacturer, model, capacity, year, vinnumber]);
          return res.status(201).json(response.success('Bus registered Successfully', dbOperationResult2.rows[0]));
        }
        return res.status(409).json(response.failure(`Bus with plate number (${platenumber}) and vinnumber (${vinnumber}) has already been registered!`, {}));
      }
      return res.status(401).json(response.failure('You are not authorized to perform this operation', {}));
    }
    errorHandler.validationError(res, result);
    return false;
  }
}
