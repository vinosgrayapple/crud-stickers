const knex = require('./knex')
module.exports = {
  getAll(query) {
    console.log('query :>> ', query)
    const knexQuery = knex('sticker')
    if (query.title) {
      return knexQuery.where('title', 'ILIKE', `%${query.title}%`)
    }
    if (query.description) {
      return knexQuery.where('description', 'ILIKE', `%${query.description}%`)
    }
    return knexQuery
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
    return knex('sticker').where('id', id).delete()
  },
}
