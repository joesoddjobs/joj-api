class Pets extends BaseModel {
  static get tableName() {
    return 'pets'
  }
  static get relationMappings() {
    return {
      educations: {
        relation: HasManyRelation,
        modelClass: User,
        join: {
          from: 'users.id',
          to: 'pets.Id',
        },
      },
    }
  }
}

module.exports = Pets
