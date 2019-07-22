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
  getJoinUser: () => {
    return knex('user')
      .join('post', 'user.id', 'post.user_id')
      .select('post.id', 'user.name as name', 'post.title', 'post.entry', 'post.language', 'post.comments',
    'post.edits', 'post.date');
  },
  create: post => {
    return knex('post').insert(post,'id').then(ids => {
      return knex('post').where('id', ids[0]).first();
    });
  },
  update: (id, post) => {
    return knex('post').where('id', id).first().update({
      title: post.title,
      entry: post.entry,
      language: post.language,
      date: post.date
    }).then(() => {
      return knex('post').where('id', id).first();
    });
  },
  remove: id => {
    return knex('post').where('id', id).del();
  }
}
