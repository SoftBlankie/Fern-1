
exports.up = function(knex) {
  return knex.schema.createTable('comment', table=> {
    table.increments();
    table.integer('user_id').notNullable();
    table.integer('post_id').notNullable();
    table.text('comment').notNullable();
    table.specificType('likes', 'text ARRAY').notNullable();
    table.specificType('reports', 'text Array').notNullable();
    table.datetime('date').notNullable();

    table.foreign('user_id').references('user.id');
    table.foreign('post_id').references('post.id');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('comment');
};
