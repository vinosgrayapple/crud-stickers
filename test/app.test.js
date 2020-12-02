const knex = require('../db/knex')
const request = require('supertest')
const expect = require('chai').expect
const app = require('../app')
const { stickers } = require('./fixtures')

describe('CRUD Stickers', () => {

  before((done) => {
    knex
      .migrate
      .latest()
      .then(() => knex.seed.run())
      .then(() => done())
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
  })

})
