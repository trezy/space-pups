#!/usr/bin/env node

const {
  client,
  q,
} = require('../helpers/faunaClient.js')

;(async function () {
  /**
   * Create functions
   */
  const functionsToCreate = [
    {
      name: 'create_order',
      role: 'admin',
      body: q.Query(
        q.Lambda(
          ['customer', 'services'],
          q.Let(
            {
              doc: q.Create('Orders', {
                data: {
                  customer: q.Var('customer'),
                  isComplete: false,
                  services: q.Var('services'),
                  subtotal: q.Round(
                    q.Add(
                      q.Map(
                        q.Var('services'),
                        q.Lambda('ref', q.Select(['data', 'price'], q.Get(q.Var('ref'))))
                      )
                    ),
                    2
                  )
                }
              }),
              services: q.Var('services')
            },
            {
              discounts: [],
              id: q.Select(['ref', 'id'], q.Var('doc')),
              isComplete: q.Select(['data', 'isComplete'], q.Var('doc')),
              services: q.Map(q.Var('services'), q.Lambda('ref', q.Select('id', q.Var('ref')))),
              subtotal: q.Select(['data', 'subtotal'], q.Var('doc')),
            }
          )
        )
      ),
    },
    {
      name: 'get_services',
      role: 'server',
      body: q.Query(
        q.Lambda(
          [],
          q.Map(
            q.Paginate(q.Documents(q.Collection('Services'))),
            q.Lambda('ref', {
              doc: q.Select('data', q.Get(q.Var('ref'))),
              id: q.Select('id', q.Var('ref'))
            })
          )
        )
      ),
    },
  ]

  await Promise.all(functionsToCreate.map(serviceDetails => {
    return client.query(q.CreateFunction(serviceDetails))
  }))
})()
