import {
  ActivityIndicator,
  View,
} from 'react-native'
import { useEffect } from 'react'

import { styles } from '../styles.js'
import { useAppContext } from './AppContext.js'

export function LoadingScreen(props) {
  const { navigation } = props

  const {
    isFetchingCustomer,
    isFetchingServices,
  } = useAppContext()

  useEffect(() => {
    if (!isFetchingCustomer && !isFetchingServices) {
      navigation.navigate('Home')
    }
  }, [
    isFetchingCustomer,
    isFetchingServices,
  ])

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  )
}
