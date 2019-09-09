const knex = require('./connection');

const selectList = ['profile.id', 'user.name as name', 'profile.avatar', 'profile.age', 'profile.location', 'profile.learning', 'profile.native', 'profile.about', 'profile.edits', 'profile.followers', 'profile.followings', 'user.date as date', 'user.is_active as is_active'];

module.exports = {
  getOne: id => {
    return knex('profile')
      .join('user', 'user.id', 'profile.user_id')
      .select(selectList)
      .where('profile.id', id).first();
  },
  getOneByName: name => {
    return knex('profile')
      .join('user', 'user.id', 'profile.user_id')
      .select(selectList)
      .where('user.name', name).first();
  },
  getAll: () => {
    return knex('profile')
      .join('user', 'user.id', 'profile.user_id')
      .select(selectList);
  },
  getJoinUser: () => {
    return knex('profile')
        .join('user', 'user.id', 'profile.user_id')
        .select(selectList);
  },
  create: profile => {
    return knex('profile').insert(profile, 'id').then(ids => {
      return knex('profile')
        .join('user', 'user.id', 'profile.user_id')
        .select(selectList)
        .where('profile.id', ids[0]).first();
    });
  },
  update: (id, profile) => {
    return knex('profile').where('id', id).first().update({
      avatar: profile.avatar,
      age: profile.age,
      location: profile.location,
      learning: profile.learning,
      native: profile.native,
      about: profile.about,
      edits: profile.edits,
      followers: profile.followers,
      followings: profile.followings
    }).then(() => {
      return knex('profile')
        .join('user', 'user.id', 'profile.user_id')
        .select(selectList)
        .where('profile.id', id).first();
    });
  },
  remove: id => {
    return knex('profile').where('id', id).del();
  }
}
