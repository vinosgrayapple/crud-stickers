const express = require('express')
const router = express.Router()
const queries = require('../db/queries')
function idValidId(req, res, next) {
  if (!isNaN(req.params.id)) {
    return next()
  }
  next(new Error('Invalid ID'))
}
function validSticker(sticker) {
  const {title,description, url,rating} = sticker
  const hasTitle = typeof title === 'string' && title.trim() !== ''
  const hasUrl = typeof url === 'string' && url.trim() !== ''
  return hasTitle  && hasUrl
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
// Insert data to DB
router.post('/',(req,res,next) => {
  if (validSticker(req.body)) {
  queries.createSticker(req.body)
  .then(stickers => res.json(stickers[0]))
  .catch(console.log)
  }else {
    next(new Error('Invalid sticker'))
  }
  
})
// Update sticker
router.put('/:id',idValidId,(req,res,next) => {
  const { id } = req.params

  queries.updateSticker(id, req.body).first().then(stickers => {
    if (stickers) {
      res.json(stickers)
    } else {
      next()
    }
  })
  
})

module.exports = router