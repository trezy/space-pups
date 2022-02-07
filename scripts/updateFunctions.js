#!/usr/bin/env node

const {
  client,
  q,
} = require('../helpers/faunaClient.js')

;(async function () {
  /**
   * Update functions
   */
  return client.query(q.Update(q.Function('create_order'), {
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
            isFirstTimeCustomer: q.Equals(
              0,
              q.Count(
                q.Filter(
                  q.Documents(q.Collection('Orders')),
                  q.Lambda(
                    'ref',
                    q.And(
                      q.Equals(
                        q.Var('customer'),
                        q.Select(['data', 'customer'], q.Get(q.Var('ref')))
                      ),
                      q.Select(['data', 'isComplete'], q.Get(q.Var('ref')))
                    )
                  )
                )
              )
            ),
            services: q.Var('services')
          },
          {
            discounts: q.Filter(
              [
                q.If(
                  q.Var('isFirstTimeCustomer'),
                  { name: 'First purchase (20% off)', modifier: 0.2 },
                  null
                )
              ],
              q.Lambda('item', q.Not(q.IsNull(q.Var('item'))))
            ),
            id: q.Select(['ref', 'id'], q.Var('doc')),
            isComplete: q.Select(['data', 'isComplete'], q.Var('doc')),
            services: q.Map(q.Var('services'), q.Lambda('ref', q.Select('id', q.Var('ref')))),
            subtotal: q.Select(['data', 'subtotal'], q.Var('doc'))
          }
        )
      )
    )
  }))
})()
