const knex = require('./connection');

module.exports = {
  getOne: id => {

  },
  getOneByUser: id => {

  },
  getAll: () => {

  },
  getAllByPost: id => {

  },
  create: edit => {

  },
  update: (id, edit) => {

  },
  remove: id => {
    return knex('edit').where('id', id).del();
  }
}
