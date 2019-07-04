
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('post').del()
    .then(() => {
      const posts = [
        {
          user_id: '1',
          title: 'First Entry',
          entry: 'Welcome to my first entry',
          language: 'Japanese',
          comments: '0',
          edits: '0',
          date: new Date()
        },
        {
          user_id: '2',
          title: 'Second Entry',
          entry: 'Welcome to my second entry',
          language: 'Japanese',
          comments: '2',
          edits: '3',
          date: new Date()
        }
      ]
      return knex('post').insert(posts)
    })
};
