const express = require('express')
const router = express.Router()
const queries = require('../db/queries')

function isValidID (req, res, next) {
  if (!isNaN(req.params.id)) {
    return next()
  }
  next(new Error('Invalid ID'))
}

function validateItem (item) {
  return typeof item === 'string' && item.trim() !== ''
}

function validSticker (sticker) {
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
router.get('/:id', isValidID, (req, res, next) => {
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
// PUT==Update sticker
router.put('/:id', isValidID, (req, res, next) => {
  const {
    id
  } = req.params
  if (validSticker(req.body)) {
    queries.updateSticker(id, req.body).then(stickers => {
        res.json(stickers[0])
    })
  } else {
    next(new Error('Invalid sticker'))
  }
})
// DELETE== sticker
router.delete('/:id', isValidID, (req, res, next) => {
  const {
    id
  } = req.params
    queries.deleteSticker(id).then((ee) => {
        if (ee) {
          res.json({deleted:true})
        } else {
          next(new Error(`Sticker with id ${id} not found.`))
        }
    })
})
module.exports = router
