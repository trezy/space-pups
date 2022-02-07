// Module imports
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react'

import {
  createOrder,
  getCustomer,
  getServices,
} from '../helpers/db.js'

export const AppContext = createContext({})

export function AppContextProvider(props) {
  const { children } = props

  const [orderDetails, setOrderDetails] = useState(null)
  const [customer, setCustomer] = useState(null)
  const [isCreatingOrder, setIsCreatingOrder] = useState(false)
  const [isFetchingCustomer, setIsFetchingCustomer] = useState(true)
  const [isFetchingServices, setIsFetchingServices] = useState(true)
  const [selectedServices, setSelectedServices] = useState({})
  const [services, setServices] = useState(null)

  const handleCreateOrder = useCallback(async () => {
    setIsCreatingOrder(true)

    const response = await createOrder(customer, selectedServices)

    setOrderDetails(response)
    setIsCreatingOrder(false)
  }, [
    customer,
    isCreatingOrder,
    selectedServices,
    setOrderDetails,
  ])

  const toggleSelectedService = useCallback(serviceID => {
    setSelectedServices(previousState => {
      const newState = { ...previousState }

      if (newState[serviceID]) {
        delete newState[serviceID]
      } else {
        newState[serviceID] = true
      }

      return newState
    })
  }, [setSelectedServices])

  useEffect(() => {
    getCustomer().then(result => {
      setCustomer(result)
      setIsFetchingCustomer(false)
    })
  }, [
    getCustomer,
    setCustomer,
    setIsFetchingCustomer,
  ])

  useEffect(() => {
    getServices().then(result => {
      setServices(result)
      setIsFetchingServices(false)
    })
  }, [
    getServices,
    setIsFetchingServices,
    setServices,
  ])

	return (
		<AppContext.Provider
			value={{
        customer,
        handleCreateOrder,
        isCreatingOrder,
        isFetchingCustomer,
        isFetchingServices,
        orderDetails,
        selectedServices,
        services,
        toggleSelectedService,
			}}>
			{children}
		</AppContext.Provider>
	)
}

export const useAppContext = () => useContext(AppContext)
