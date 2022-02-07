import {
  client,
  q,
} from './faunaClient.js'

export const getCustomer = async () => {
  const customerRef = q.Select(
    ['data', 0],
    q.Paginate(
      q.Documents(q.Collection('Customers')),
      { size: 1 }
    )
  )

  const response = await client.query(q.Let(
    { ref: customerRef },
    {
      doc: q.Select('data', q.Get(q.Var('ref'))),
      id: q.Select('id', q.Var('ref'))
    }
  ))

  return {
    ...response.doc.data,
    id: response.id,
  }
}

export const getServices = async () => {
  const getServicesFunctionRef = q.Function('get_services')

  const response = await client.query(q.Call(getServicesFunctionRef))

  return response.data.map(item => {
    return {
      ...item.doc,
      id: item.id,
    }
  })
}

export const createOrder = async (customer, services) => {
  const customerRef = q.Ref(q.Collection('Customers'), customer.id)
  const servicesRefs = Object.keys(services).map(serviceID => {
    return q.Ref(q.Collection('Services'), serviceID)
  })

  const createOrderFunctionRef = q.Function('create_order_with_discount')

  const response = await client.query(q.Call(createOrderFunctionRef, customerRef, servicesRefs))

  return response
}
