const knex = require('./connection');

const selectList = ['comment.id', 'user.name as name', 'comment.post_id', 'comment.comment', 'comment.likes', 'comment.reports', 'comment.date'];

module.exports = {
  getOne: id => {
    return knex('comment').where('id', id).first();
  },
  getAllByPost: id => {
    return knex('comment').where('post_id', id);
  },
  getJoinUser: () => {
    return knex('comment')
      .join('user', 'user.id', 'comment.user_id')
      .select(selectList);
  },
  create: comment => {
    return knex('comment').insert(comment, 'id').then(ids => {
      return knex('comment')
        .join('user', 'user.id', 'comment.user_id')
        .select(selectList)
        .where('comment.id', ids[0]).first();
    });
  },
  update: (id, comment) => {
    return knex('comment').where('id', id).first().update({
      comment: comment.comment,
      likes: comment.likes,
      reports: comment.reports,
      date: comment.date
    }).then(() => {
      return knex('comment')
        .join('user', 'user.id', 'comment.user_id')
        .select(selectList)
        .where('comment.id', id).first();
    });
  },
  remove: id => {
    return knex('comment').where('id', id).del();
  }
}
