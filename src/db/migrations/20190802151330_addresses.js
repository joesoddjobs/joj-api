/* eslint-disable func-names */
exports.up = function(knex, Promise) {
  return knex.schema.createTable('addresses', table => {
    table
      .uuid('id')
      .notNull()
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'))
    table
      .uuid('jobId')
      .index()
      .references(`jobs.id`)
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table
      .uuid('contractorId')
      .references('contractors.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table
      .uuid('customerId')
      .references('customers.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table.text('street').notNull()
    table.text('city').notNull()
    table.text('state').notNull()
    table.text('postalCode').notNull()
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
  return knex.schema.dropTable('addresses')
}
