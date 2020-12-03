const express = require('express')
const router = express.Router()
const queries = require('../db/queries')

function idValidId(req, res, next) {
  if (!isNaN(req.params.id)) {
    return next()
  }
  next(new Error('Invalid ID'))
}

function validateItem(item) {
  return typeof item === 'string' && item.trim() !== ''
}

function validSticker(sticker) {
  const {
    title,
    description,
    url,
    rating
  } = sticker
  const hasTitle = validateItem(title)
  const hasUrl = validateItem(url)
  const hasDescription = validateItem(description)
  const hasRating = !isNaN(rating)
  return hasTitle && hasDescription && hasUrl && hasRating
}
//  List All Records
router.get('/', (req, res) => {
  queries.getAll().then(stickers => {
    res.json(stickers)
  })
})
// Get Sticker by ID
router.get('/:id', idValidId, (req, res, next) => {
  const {
    id
  } = req.params
  queries.getById(id).first().then(stickers => {
    if (stickers) {
      res.json(stickers)
    } else {
      next()
    }
  })
})
// POST === Insert sticker to DB
router.post('/', (req, res, next) => {
  if (validSticker(req.body)) {
    queries.createSticker(req.body)
      .then(stickers => {
        res.json(stickers[0])
      })
      .catch(error => next(error))
  } else {
    next(new Error('Invalid sticker'))
  }
})
// Update sticker
router.put('/:id', idValidId, (req, res, next) => {
  const {
    id
  } = req.params
  if (validSticker(req.body)) {
    queries.updateSticker(id, req.body).first().then(stickers => {
      if (stickers) {
        res.json(stickers)
      } else {
        next()
      }
    })
  } else {
    next(new Error('Invalid sticker'))
  }
})

module.exports = router
