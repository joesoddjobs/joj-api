exports.up = function(knex, Promise) {
  return knex.schema.createTable('pets', table => {
    table
      .uuid('id')
      .notNull()
      .primary()
    table.text('name').notNull()
    table.unique().notNull()
    table.enu('color', ['BLACK', 'WHITE', 'ORANGE', 'STRIPED']).nullable()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
}
