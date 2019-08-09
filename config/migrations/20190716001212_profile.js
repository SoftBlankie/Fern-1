
exports.up = function(knex) {
  return knex.schema.createTable('profile', table=> {
    table.increments();
    table.integer('user_id').notNullable();
    table.integer('age');
    table.text('location');
    table.text('learning');
    table.text('native');
    table.integer('followers').notNullable().defaultTo(0);
    table.integer('followings').notNullable().defaultTo(0);

    table.foreign('user_id').references('user.id');;
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('profile');
};
