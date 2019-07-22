
exports.up = function(knex) {
  return knex.schema.createTable('user_info', table=> {
    table.increments();
    table.integer('user_id').notNullable();
    table.integer('age').notNullable();
    table.text('location').notNullable();
    table.text('learning').notNullable();
    table.text('native').notNullable();
    table.integer('followers').notNullable();
    table.integer('followings').notNullable();

    table.foreign('user_id').references('user.id');;
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user_info');
};
