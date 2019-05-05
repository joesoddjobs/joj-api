exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table
      .uuid('id')
      .notNull()
      .primary()
    table.text('name').notNull()
    table
      .text('email')
      .unique()
      .notNull()
    table.text('password').notNull()
    table.enu('pets', ['CAT', 'ANOTHER CAT', 'BIG CAT', 'SMALL CAT']).nullable()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
}
