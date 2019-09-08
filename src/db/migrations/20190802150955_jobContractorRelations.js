/* eslint-disable func-names */
exports.up = function(knex, Promise) {
  return knex.schema.createTable('jobContractorRelations', table => {
    table
      .uuid('id')
      .notNull()
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'))
    table
      .uuid('jobId')
      .notNull()
      .references('jobs.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table
      .uuid('contractorId')
      .notNull()
      .references('contractors.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table
      .timestamp('createdAt')
      .defaultTo(knex.fn.now())
      .notNull()
    table
      .timestamp('updatedAt')
      .defaultTo(knex.fn.now())
      .notNull()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('jobContractorRelations')
}
