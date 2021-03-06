const knex = require('./connection');

const selectList = ['post.id', 'user.name as name', 'post.title', 'post.entry', 'post.language', 'post.comments', 'post.edits', 'post.date'];

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
  getAllByLanguage: language => {
    return knex('post').where('language', language);
  },
  getJoinUser: () => {
    return knex('post')
      .join('user', 'user.id', 'post.user_id')
      .select(selectList);
  },
  create: post => {
    return knex('post').insert(post, 'id').then(ids => {
      return knex('post')
        .join('user', 'user.id', 'post.user_id')
        .select(selectList)
        .where('post.id', ids[0]).first();
    });
  },
  update: (id, post) => {
    return knex('post').where('id', id).first().update({
      title: post.title,
      entry: post.entry,
      language: post.language,
      comments: post.comments,
      edits: post.edits,
      date: post.date
    }).then(() => {
      return knex('post')
        .join('user', 'user.id', 'post.user_id')
        .select(selectList)
        .where('post.id', id).first();
    });
  },
  remove: id => {
    return knex('comment').where('post_id', id).del()
      .then(() => {
        return knex('edit').where('post_id', id).del()
          .then(() => {
            return knex('post').where('id', id).del();
          });
      });
  }
}
