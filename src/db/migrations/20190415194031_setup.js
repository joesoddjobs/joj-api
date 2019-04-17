const { createTableIfNotExists } = require('../helpers')

exports.up = async knex =>
  createTableIfNotExists(knex, 'user', table => {
    table
      .increments('id')
      .notNullable()
      .unsigned()

    table
      .uuid('uuid')
      .index()
      .unique()
      .notNullable()

    table.string('first_name').notNullable()

    table.string('last_name').notNullable()

    table
      .string('title', 500)
      .notNullable()
      .defaultTo('')

    table
      .string('email')
      .index()
      .notNullable()
      .unique()

    table
      .boolean('email_is_confirmed')
      .notNullable()
      .defaultTo(false)

    table.string('phone').nullable()

    table.string('zipcode').notNullable()

    table.text('image_url').nullable()

    table.text('password_hash').notNullable()

    table
      .timestamp('created_at')
      .defaultTo(knex.fn.now())
      .notNullable()

    table
      .timestamp('updated_at')
      .defaultTo(knex.fn.now())
      .notNullable()
  })

exports.down = async knex => knex.schema.dropTableIfExists('user')
