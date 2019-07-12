
exports.up = function(knex) {
  return knex.schema.createTable('post', table=> {
    table.increments();
    table.integer('user_id').notNullable();
    table.text('title').notNullable();
    table.text('entry').notNullable();
    //table.integer('character_count').notNullable();
    table.text('language').notNullable();
    table.integer('comments').notNullable();
    table.integer('edits').notNullable();
    table.datetime('date').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('post');
};
