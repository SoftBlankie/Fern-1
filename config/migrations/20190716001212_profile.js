
exports.up = function(knex) {
  return knex.schema.createTable('profile', table=> {
    table.increments();
    table.integer('user_id').notNullable();
    table.integer('age').notNullable().defaultTo(0);
    table.text('location').notNullable().defaultTo('');
    table.text('learning').notNullable().defaultTo('');
    table.text('native').notNullable().defaultTo('');
    table.text('about').notNullable().defaultTo('');
    table.specificType('followers', 'text ARRAY').notNullable();
    table.specificType('followings', 'text ARRAY').notNullable();

    table.foreign('user_id').references('user.id');;
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('profile');
};
