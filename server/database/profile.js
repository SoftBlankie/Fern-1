const knex = require('./connection');

module.exports = {
  getOne: id => {
    return knex('profile').where('id', id).first();
  },
  getAll: () => {
    return knex('profile');
  },
  getJoinUser: () => {
    return knex('profile')
        .join('user', 'user.id', 'profile.user_id')
        .select('profile.id', 'user.name as name', 'profile.age', 'profile.location', 'profile.learning', 'profile.native', 'profile.followers', 'profile.followings');
  },
  create: profile => {
    return knex('profile').insert(profile, 'id').then(ids => {
      return knex('profile')
        .join('user', 'user.id', 'profile.user_id')
        .select('profile.id', 'user.name as name', 'profile.age', 'profile.location', 'profile.learning', 'profile.native', 'profile.followers', 'profile.followings')
        .where('profile.id', ids[0]).first();
    });
  },
  update: (id, profile) => {
    return knex('profile').where('id', id).first().update({
      age: profile.age,
      location: profile.location,
      learning: profile.learning,
      native: profile.native,
      followers: profile.followers,
      followings: profile.followings
    }).then(() => {
      return knex('profile')
        .join('user', 'user.id', 'profile.user_id')
        .select('profile.id', 'user.name as name', 'profile.age', 'profile.location', 'profile.learning', 'profile.native', 'profile.followers', 'profile.followings')
        .where('profile.id', id).first();
    });
  },
}
