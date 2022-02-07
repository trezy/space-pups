#!/usr/bin/env node

const {
  client,
  q,
} = require('../helpers/faunaClient.js')

;(async function () {
  /**
   * Create a customer
   */
  await client.query(q.Create('Customers', {
    data: {
      name: 'Bark Hamill',
      breed: 'Corgi'
    }
  }))

  /**
   * Create services
   */
  const servicesToCreate = [
    {
      name: 'The Singularity Scrub',
      description: 'Get your pup as clean as a newborn star with our Singularity Scrub! Our proprietary Black Hole Deshedding™ process will have them howling happy in no time!',
      price: 2499.99,
    },
    {
      name: 'The AntiGrav Nail Trim',
      description: 'Never before has your doggo had a nail trim this good! In our very own hab attached to the International Space Station, we can trim your pup\'s paws without all of the pesky trimmings getting in the way.',
      price: 1999.99,
    },
    {
      name: 'The SubZero Spa',
      description: 'It might be a little cold at 0K, but your pet will be SO refreshed after this bath of a lifetime! The SubZero Spa gives your pup an opportunity to really chill out!',
      price: 19999.99,
    },
  ]

  await Promise.all(servicesToCreate.map(serviceDetails => {
    return client.query(q.Create('Services', {
      data: serviceDetails,
    }))
  }))
})()
