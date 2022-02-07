const faunadb = require('faunadb')

module.exports = {
  client: new faunadb.Client({
    domain: 'db.fauna.com',
    port: 443,
    scheme: 'https',
    secret: 'your FaunaDB secret',
  }),
  q: faunadb.query,
}
