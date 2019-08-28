
exports.up = function(knex) {
  return knex.schema.createTable('edit', table=> {
    table.increments();
    table.integer('user_id').notNullable();
    table.integer('post_id').notNullable();
    table.text('selection').notNullable();
    table.text('edit').notNullable();
    table.specificType('agrees', 'text ARRAY').notNullable();
    table.specificType('reports', 'text ARRAY').notNullable();
    table.datetime('date').notNullable();

    table.foreign('user_id').references('user.id');
    table.foreign('post_id').references('post.id');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('edit');
};
