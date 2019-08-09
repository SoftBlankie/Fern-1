
exports.up = function(knex) {
  return knex.schema.createTable('profile', table=> {
    table.increments();
    table.integer('user_id').notNullable();
    table.integer('age');
    table.text('location');
    table.text('learning');
    table.text('native');
    table.specificType('followers', 'integer ARRAY');
    table.specificType('followings', 'integer ARRAY');

    table.foreign('user_id').references('user.id');;
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('profile');
};
