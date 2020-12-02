const express = require('express')
const router = express.Router()
const queries = require('../db/queries')
function idValidId(req, res, next) {
  if (!isNaN(req.params.id)) {
    return next()
  }
  next(new Error('Invalid ID'))
}
router.get('/', (req, res) => {
  queries.getAll().then(stickers => {
    res.json(stickers)
  })
})

router.get('/:id', idValidId, (req, res, next) => {
  const { id } = req.params
  queries.getById(id).first().then(stickers => {
    if (stickers) {
      res.json(stickers)
    } else {
      next()
    }
  })
})

module.exports = router