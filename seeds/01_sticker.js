const stickers = require('../stickers')
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('stiker').del()
    .then(function () {
      // Inserts seed entries
      return knex('stiker').insert(stickers)
    })
}
