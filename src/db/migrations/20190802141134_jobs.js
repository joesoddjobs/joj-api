const RATE_PER_HOUR = 25

/* eslint-disable func-names */
exports.up = function(knex, Promise) {
  return knex.schema.createTable('jobs', table => {
    table
      .uuid('id')
      .notNull()
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'))
    table
      .uuid('customerId')
      .notNull()
      .references('customers.id')
    table
      .enum('status', ['CLAIMED', 'OPEN', 'COMPLETED', 'PAID'])
      .defaultTo('OPEN')
    table.enum('jobType', [
      'LANDSCAPING',
      'LAWN_MOWING',
      'MOVING',
      'FURNITURE_ASSEMBLY',
      'POWER_WASHING',
      'PAINTING',
      'CLEANING',
      'OTHER',
    ])
    table.integer('estimatedTime').notNull()
    table.integer('numberOfContractors').notNull()
    table.integer('actualTime')
    table.text('jobDescription')
    table.timestamp('firstChoiceDateTime').notNull()
    table.timestamp('secondChoiceDateTime').notNull()
    table.timestamp('scheduledDateTime')
    table.integer('rate').defaultTo(RATE_PER_HOUR)
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
  return knex.schema.dropTable('jobs')
}
