const knex = require('./knex')
module.exports = {
  getAll() {
    return knex('sticker').select('title', 'description', 'rating', 'url')
  },
  getById(id) {
    return knex('sticker').where('id', id)
  }
}