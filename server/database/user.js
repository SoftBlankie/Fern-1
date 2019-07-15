const knex = require('./connection');

module.exports = {
  getOne: id => {
    return knex('user').where('id', id).first();
  },
  getOneByName: name => {
    return knex('user').where('name', name).first();
  },
  getOneByEmail: email => {
    return knex('user').where('email', email).first();
  },
  create: user => {
    return knex('user').insert(user, 'id').then(ids => {
      return ids[0];
    });
  }
}
