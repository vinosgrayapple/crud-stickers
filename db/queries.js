const knex = require('./knex')
module.exports = {
  getAll() {
    return knex('sticker') //.select('title', 'description', 'rating', 'url')
  },
  getById(id) {
    return knex('sticker').where('id', id).first()
  },
  createSticker(sticker) {
    return knex('sticker').insert(sticker, '*')
  },
  updateSticker(id, stiker) {
    return knex('sticker').where('id', id).update(stiker, '*')
  },
  deleteSticker(id) {
    return knex('sticker').where('id',id).delete()
  }
}