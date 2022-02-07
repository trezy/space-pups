export const getCustomer = async () => {
  return {
    breed: 'Corgi',
    id: 1,
    name: 'Bark Hamill',
  }
}

export const getServices = async () => {
  return [
    {
      name: 'The Singularity Scrub',
      description: 'Get your pup as clean as a newborn star with our Singularity Scrub! Our proprietary Black Hole Deshedding™ process will have them howling happy in no time!',
      price: 2500,
      id: 2,
    }
  ]
}

export const createOrder = async (customer, services) => {
  return {
    discounts: [],
    id: 3,
    isComplete: false,
    services: [2],
    subtotal: 2500
  }
}
