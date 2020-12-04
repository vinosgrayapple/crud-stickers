module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: process.env.PGPORT,
      user: 'vinos',
      password: '1004797537',
      database: 'vinos-web-store'
    }
  },
  test: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: process.env.PGPORT,
      user: 'vinos',
      password: '1004797537',
      database: 'test-vinos-web-store'
    }
  },
   production: {
    client: 'pg',
    connection:process.env.DATABASE_URL
  }
}
