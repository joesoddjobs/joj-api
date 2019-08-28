/* eslint-disable func-names */
exports.up = function(knex, Promise) {
  return knex.schema.createTable('administrators', table => {
    table
      .uuid('id')
      .notNull()
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'))
    table
      .text('email')
      .unique()
      .notNull()
    table.text('password').notNull()
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
  return knex.schema.dropTable('administrators')
}
