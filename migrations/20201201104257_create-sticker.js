
exports.up = function (knex) {
  return knex.schema.createTable('stiker', table => {
    table.increments()
    table.text('title')
    table.text('description')
    table.float('rating')
    table.text('url')
  })
}

exports.down = function (knex) {
  return knex.dropTable('sticker')
}
