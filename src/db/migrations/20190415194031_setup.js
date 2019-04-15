const { createTableIfNotExists } = require('../helpers')

exports.up = async knex =>
  createTableIfNotExists(knex, 'user', table => {
    table
      .integer('id')
      .index()
      .unique()
      .notNullable()

    table
      .uuid('uuid')
      .index()
      .notNullable()

    table.string('first_name').notNullable()

    table.string('last_name')

    table.string('title', 500)

    table
      .string('email')
      .index()
      .notNullable()

    table.string('phone')

    table.string('address_line_1', 500).notNullable()

    table.string('address_line_2', 500)

    table.string('city').notNullable()

    table.string('state').notNullable()

    table.string('zipcode').notNullable()

    table.text('image_url')

    table.text('password_hash').notNullable()

    table
      .boolean('email_is_confirmed')
      .notNullable()
      .defaultTo(false)

    table.timestamp('date_of_birth')

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
