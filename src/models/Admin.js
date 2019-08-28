const BaseModel = require('./BaseModel')

class Admin extends BaseModel {
  static get tableName() {
    return 'administrators'
  }
}

module.exports = Admin
