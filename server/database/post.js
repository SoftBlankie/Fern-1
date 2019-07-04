const knex = require('./connection');

module.exports = {
  getOne: id => {
    return knex('post').where('id', id).first();
  },
  getOneByUser: id => {
    return knex('post').where('user_id', id).first();
  },
  getAll: () => {
    return knex('post');
  },
  create: post => {
    return knex('post').insert(post,'id').then(ids => {
      return knex('post').where('id', ids[0]).first();
    });
  },
  remove: id => {
    return knex('post').where('id', id).del();
  }
}
