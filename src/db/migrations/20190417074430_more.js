const { createTableIfNotExists } = require('../helpers')

exports.up = async knex => {
  const promises = [
    () =>
      createTableIfNotExists(knex, 'email_email_confirm', table => {
        table
          .increments('id')
          .notNullable()
          .unsigned()
        table
          .uuid('uuid')
          .index()
          .unique()
          .notNullable()
        table
          .string('token')
          .index()
          .unique()
          .notNullable()
        table
          .uuid('user_uuid')
          .index()
          .notNullable()
          .references('user.uuid')
          .onUpdate('CASCADE')
          .onDelete('CASCADE')
        table
          .string('email')
          .index()
          .notNullable()
        table
          .boolean('sent')
          .index()
          .notNullable()
          .defaultTo(false)
        table
          .timestamp('created_at')
          .defaultTo(knex.fn.now())
          .notNullable()

        table.unique(['user_uuid', 'email'], 'user_uuid_email_unique')
      }),
    () =>
      createTableIfNotExists(knex, 'email_reset_password', table => {
        table
          .increments('id')
          .notNullable()
          .unsigned()
        table
          .uuid('uuid')
          .index()
          .unique()
          .notNullable()
        table
          .string('token')
          .index()
          .unique()
          .notNullable()
        table
          .string('email')
          .index()
          .notNullable()
        table
          .uuid('user_uuid')
          .index()
          .notNullable()
          .references('user.uuid')
          .onUpdate('CASCADE')
          .onDelete('CASCADE')
        table
          .boolean('is_notification_password_change')
          .index()
          .notNullable()
          .defaultTo(false)
        table
          .boolean('is_notification_password_reset')
          .index()
          .notNullable()
          .defaultTo(false)
        table
          .boolean('sent')
          .index()
          .notNullable()
          .defaultTo(false)
        table
          .timestamp('created_at')
          .defaultTo(knex.fn.now())
          .notNullable()

        // there can be multiple user_uuid x email rows so we do not
        // want a unique index on them here
      }),
    () =>
      createTableIfNotExists(knex, 'email_revert_email', table => {
        table
          .increments('id')
          .notNullable()
          .unsigned()
        table
          .uuid('uuid')
          .index()
          .unique()
          .notNullable()
        table
          .string('token')
          .index()
          .unique()
          .notNullable()
        table
          .string('email')
          .index()
          .notNullable()
        table
          .uuid('user_uuid')
          .index()
          .notNullable()
          .references('user.uuid')
          .onUpdate('CASCADE')
          .onDelete('CASCADE')
        table
          .boolean('sent')
          .index()
          .notNullable()
          .defaultTo(false)
        table
          .timestamp('created_at')
          .defaultTo(knex.fn.now())
          .notNullable()

        // there can be multiple user_uuid x email rows so we do not
        // want a unique index on them here
      }),
    () =>
      createTableIfNotExists(knex, 'email_welcome_email', table => {
        table
          .increments('id')
          .notNullable()
          .unsigned()
        table
          .uuid('uuid')
          .index()
          .unique()
          .notNullable()
        table
          .uuid('user_uuid')
          .index()
          .unique()
          .notNullable()
          .references('user.uuid')
          .onUpdate('CASCADE')
          .onDelete('CASCADE')
        table
          .boolean('sent')
          .index()
          .notNullable()
          .defaultTo(false)
        table
          .timestamp('created_at')
          .defaultTo(knex.fn.now())
          .notNullable()
      }),
    () =>
      createTableIfNotExists(knex, 'plaid_data', table => {
        table
          .increments('id')
          .notNullable()
          .unsigned()

        table
          .uuid('uuid')
          .index()
          .unique()
          .notNullable()

        table
          .uuid('user_uuid')
          .index()
          .notNullable()
          .unique()
          .references(`user.uuid`)
          .onUpdate('CASCADE')
          .onDelete('CASCADE')

        table.text('access_token').notNullable()

        table
          .timestamp('created_at')
          .defaultTo(knex.fn.now())
          .notNullable()

        table
          .timestamp('updated_at')
          .defaultTo(knex.fn.now())
          .notNullable()
      }),
    () =>
      createTableIfNotExists(knex, 'contribution', table => {
        table
          .increments('id')
          .notNullable()
          .unsigned()

        table
          .uuid('uuid')
          .index()
          .unique()
          .notNullable()

        table
          .uuid('user_uuid')
          .index()
          .notNullable()
          .unique()
          .references(`user.uuid`)
          .onUpdate('CASCADE')
          .onDelete('CASCADE')

        table
          .integer('amount')
          .index()
          .notNullable()

        table
          .timestamp('created_at')
          .defaultTo(knex.fn.now())
          .notNullable()

        table
          .timestamp('updated_at')
          .defaultTo(knex.fn.now())
          .notNullable()
      }),
    () =>
      createTableIfNotExists(knex, 'request', table => {
        table
          .increments('id')
          .notNullable()
          .unsigned()

        table
          .uuid('uuid')
          .index()
          .unique()
          .notNullable()

        table
          .uuid('user_uuid')
          .index()
          .notNullable()
          .unique()
          .references(`user.uuid`)
          .onUpdate('CASCADE')
          .onDelete('CASCADE')

        table
          .integer('amount')
          .index()
          .notNullable()

        // reason here is a comma separated string of the reasons selected by the user on the frontend
        table.text('reason').notNullable()

        table
          .boolean('experienced_financial_challenge')
          .index()
          .notNullable()

        table
          .text('financial_challenge_explanation')
          .notNullable()
          .defaultTo('')

        table
          .timestamp('created_at')
          .defaultTo(knex.fn.now())
          .notNullable()

        table
          .timestamp('updated_at')
          .defaultTo(knex.fn.now())
          .notNullable()
      }),
  ]

  for (const promiseFn of promises) {
    await promiseFn()
  }
}

exports.down = async knex => {
  const promises = [
    () => knex.schema.dropTableIfExists('email_email_confirm'),
    () => knex.schema.dropTableIfExists('email_reset_password'),
    () => knex.schema.dropTableIfExists('email_revert_email'),
    () => knex.schema.dropTableIfExists('email_welcome_email'),
    () => knex.schema.dropTableIfExists('plaid_data'),
    () => knex.schema.dropTableIfExists('contribution'),
    () => knex.schema.dropTableIfExists('request'),
  ]
  for (const promiseFn of promises) {
    await promiseFn()
  }
}
