
exports.seed = (knex, Promise) => {
    return knex.raw('DELETE FROM "user"; ALTER SEQUENCE user_id_seq RESTART WITH 3')
      .then(() => {
        const users = [
          {
            id: 1,
            name: 'John Doe',
            email: 'berto.ort@gmail.com',
            password: 'pineapple',
            date: new Date()
          },
          {
            id: 2,
            name: 'Hello World',
            email: 'hello@cjr.co.de',
            password: 'keyboard_cat',
            date: new Date()
          }
        ]
        return knex('user').insert(users)
      })
};
