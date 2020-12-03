const knex = require('../db/knex')
const request = require('supertest')
const expect = require('chai').expect
const app = require('../app')
const { stickers, sticker } = require('./fixtures')

describe('CRUD Stickers', (done) => {
  before((done) => {
    knex
      .migrate
      .latest()
      .then(() => {
        return knex.seed.run()
      })
      .then(() => { done() })
      .catch(done)
  })

  it('List All Records', (done) => {
    request(app)
      .get('/api/v1/stickers')

      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('array')
        expect(response.body).to.deep.equal(stickers)
        done()
      })
      .catch(done)
  })
  it('A sticker by ID', (done) => {
    request(app)
      .get('/api/v1/stickers/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        stickers[0].id = response.body.id
        expect(response.body).to.be.a('object')
        expect(response.body).to.deep.equal(stickers[0])
        done()
      })
      .catch(done)
  })
  it('Insert sticker', (done) => {
    request(app)
      .post('/api/v1/stickers/')
      .send(sticker)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        sticker.id = response.body.id
        expect(response.body).to.be.a('object')
        expect(response.body).to.deep.equal(sticker)
        done()
      })
      .catch(done)
  })
})
