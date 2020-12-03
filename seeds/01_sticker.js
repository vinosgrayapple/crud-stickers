const stickers = require('../stickers')
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('sticker').del()
  await knex.raw('ALTER SEQUENCE stiker_id_seq RESTART;')

  return knex('sticker')
    .then(function () {
      // Inserts seed entries
      return knex('sticker').insert(stickers)
    })
}
