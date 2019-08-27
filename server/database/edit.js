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
  getJoinUser: () => {
    return knex('edit')
      .join('user', 'user.id', 'edit.user_id')
      .select('edit.id', 'user.name as name', 'edit.post_id', 'edit.selection', 'edit.edit', 'edit.agrees',  'edit.date');
  },
  create: edit => {
    return knex('edit').insert(edit, 'id').then(ids => {
      return knex('edit')
        .join('user', 'user.id', 'edit.user_id')
        .select('edit.id', 'user.name as name', 'edit.post_id', 'edit.selection', 'edit.edit', 'edit.agrees', 'edit.date')
        .where('edit.id', ids[0]).first();
    });
  },
  update: (id, edit) => {
    return knex('edit').where('id', id).first().update({
      edit: edit.edit,
      date: edit.date
    }).then(() => {
      return knex('edit')
        .join('user', 'user.id', 'edit.user_id')
        .select('edit.id', 'user.name as name', 'edit.post_id', 'edit.selection', 'edit.edit', 'edit.agrees', 'edit.date')
        .where('edit.id', id).first();
    });
  },
  remove: id => {
    return knex('edit').where('id', id).del();
  }
}
