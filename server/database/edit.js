const knex = require('./connection');

module.exports = {
  getOne: id => {
    return knex('edit').where('id', id).first();
  },
  getOneByUser: id => {
    return knex('edit').where('user_id', id).first();
  },
  getAllByPost: id => {
    return knex('edit').where('post_id', id);
  },
  create: edit => {
    return knex('edit').insert(edit, 'id').then(ids => {
      return knex('edit').where('id', ids[0]).first();
    });
  },
  update: (id, edit) => {
    return knex('edit').where('id', id).first().update({
      edit: edit.edit,
      date: edit.date
    }).then(() => {
      return knex('edit').where('id', id).first();
    });
  },
  remove: id => {
    return knex('edit').where('id', id).del();
  }
}
