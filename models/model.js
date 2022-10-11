const Joi = require('@hapi/joi')
const { Model } = require("objection")
const db = require('../config/db_connection')
Model.knex(db)

class Userdata extends Model {
    static get tableName() {
        return "users_details"
    }

    static get JoiSchema() {
        return Joi.object({
            id: Joi.number().integer().greater(0),
            first_name: Joi.string().min(1).max(50).required(),
            last_name: Joi.string().min(1).max(50).required(),
            email: Joi.max(50).required(),
            password: Joi.string().min(5).max(20).required()
        })
    }
}

module.exports = Userdata;