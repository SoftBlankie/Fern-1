
exports.up = function(knex) {
  return knex.schema.createTable('comment', table=> {
    table.increments();
    table.integer('user_id').notNullable();
    table.text('comment').notNullable();
    table.datetime('date').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('comment');
};
