const knex = require('./knex')
module.exports = {
  getAll() {
    return knex('sticker').select('title', 'description', 'rating', 'url')
  },
  getById(id) {
    return knex('sticker').where('id', id).first()
  },
  createSticker(id, stiker) {
    return knex('sticker').insert(stiker,'*')
  },
  updateSticker(id) {
    return knex('sticker')
    .where('id',id)
    .update(stiker)
  }
}