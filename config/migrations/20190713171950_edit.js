
exports.up = function(knex) {
  return knex.schema.createTable('edit', table=> {
    table.increments();
    table.integer('user_id').notNullable();
    table.text('edit').notNullable();
    table.datetime('date').notNullable();
  })
};

exports.down = function(knex) {
  
};
