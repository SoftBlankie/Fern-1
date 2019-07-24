const knex = require('./connection');

module.exports = {
  getOne: id => {
    return knex('comment').where('id', id).first();
  },
  getAllByPost: id => {
    return knex('comment').where('post_id', id);
  },
  create: comment => {
    return knex('comment').insert(comment, 'id').then(ids => {
      return knex('comment').where('id', ids[0]).first();
    });
  },
  update: (id, comment) => {
    return knex('comment').where('id', id).first().update({
      comment: comment.comment,
      date: comment.date
    }).then(() => {
      return knex('comment').where('id', id).first();
    });
  },
  remove: id => {
    return knex('comment').where('id', id).del();
  }
}
