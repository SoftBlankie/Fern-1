const knex = require('./connection');

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
      .select('comment.id', 'user.name as name', 'comment.post_id', 'comment.comment', 'comment.likes', 'comment.date');
  },
  create: comment => {
    return knex('comment').insert(comment, 'id').then(ids => {
      return knex('comment')
        .join('user', 'user.id', 'comment.user_id')
        .select('comment.id', 'user.name as name', 'comment.post_id', 'comment.comment', 'comment.likes', 'comment.date')
        .where('comment.id', ids[0]).first();
    });
  },
  update: (id, comment) => {
    return knex('comment').where('id', id).first().update({
      comment: comment.comment,
      likes: comment.likes,
      date: comment.date
    }).then(() => {
      return knex('comment')
        .join('user', 'user.id', 'comment.user_id')
        .select('comment.id', 'user.name as name', 'comment.post_id', 'comment.comment', 'comment.likes', 'comment.date')
        .where('comment.id', id).first();
    });
  },
  remove: id => {
    return knex('comment').where('id', id).del();
  }
}
