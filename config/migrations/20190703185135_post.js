
exports.up = function(knex) {
  return knex.schema.createTable('post', table=> {
    table.increments();
    table.integer('user_id').notNullable();
    table.text('title').notNullable();
    table.text('entry').notNullable();
    table.text('language').notNullable();
    table.integer('comments').notNullable().defaultTo(0);
    table.integer('edits').notNullable().defaultTo(0);
    table.datetime('date').notNullable();

    table.foreign('user_id').references('user.id');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('post');
};
