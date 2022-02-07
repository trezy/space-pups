#!/usr/bin/env node

const {
  client,
  q,
} = require('../helpers/faunaClient.js')

;(async function () {
  const collectionsToCreate = [
    'Customers',
    'Orders',
    'Services',
  ]

  await Promise.all(collectionsToCreate.map(collectionName => client.query(q.CreateCollection({ name: collectionName }))))
})()
