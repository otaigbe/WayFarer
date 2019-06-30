import joi from 'joi';
import extension from '@hapi/joi-date';

const Joi = joi.extend(extension);
export default class Schemas {
  /**
   * returns schema for validating user signup data
   * @returns {Object} schema for validation
   */
  static get userSchema() {
    return Joi.object({
      firstname: Joi.string().min(2).trim().required(),
      lastname: Joi.string().trim().min(2).required(),
      password: Joi.string().alphanum().min(4).trim()
        .max(50)
        .required(),
      email: Joi.string().email().min(5).trim()
        .required(),
      isadmin: Joi.boolean().required(),
    });
  }

  /**
   * returns schema for validating user sign in data
   * @returns {Object} schema for validation
   */
  static get signInSchema() {
    return Joi.object({
      password: Joi.string().alphanum().min(4).trim()
        .max(50)
        .required(),
      email: Joi.string().email().min(5).trim()
        .required(),
    });
  }

  /**
   * returns schema for validating user sign in data
   * @returns {Object} schema for creating an object
   */
  static get createTripSchema() {
    return Joi.object({
      busid: Joi.number().integer().required(),
      origin: Joi.string().trim().min(3).required(),
      tripdate: Joi.date().format('YYYY-MM-DD').required(),
      destination: Joi.string().trim().min(3).required(),
      fare: Joi.number().required(),
      status: Joi.string().trim().valid('active', 'cancelled'),
    });
  }

  /**
   * returns schema for validating user sign in data
   * @returns {Object} schema for creating an object
   */
  static get getAllTripsSchema() {
    return Joi.object({
      page: Joi.number().integer(),
      quantity: Joi.number().integer(),
    });
  }

  /**
   * returns schema for validating user sign in data
   * @returns {Object} schema for creating an object
   */
  static get registerBusSchema() {
    return Joi.object({
      platenumber: Joi.string().trim().required(),
      manufacturer: Joi.string().required(),
      model: Joi.string().trim().required(),
      year: Joi.number().integer().min(1999).max(new Date().getFullYear())
        .required(),
      capacity: Joi.number().required(),
      vinnumber: Joi.string().trim().required(),
    });
  }
}
