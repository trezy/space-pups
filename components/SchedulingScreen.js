import { ScrollView } from 'react-native'
import { useCallback } from 'react'
import {
  Button,
  Dialog,
  colors,
  PricingCard,
  Text,
} from 'react-native-elements'

import { useAppContext } from './AppContext.js'
import { humanizePrice } from '../helpers/humanizePrice.js'
import { Layout } from './Layout.js'
import { styles } from '../styles.js'

export function SchedulingScreen(props) {
  const { navigation } = props
  const {
    handleCreateOrder,
    isCreatingOrder,
    toggleSelectedService,
    selectedServices,
    services,
  } = useAppContext()

  const handleReviewService = useCallback(async () => {
    await handleCreateOrder()
    navigation.navigate('Confirm Order')
  }, [handleCreateOrder])

  const mapServices = useCallback(service => {
    const handlePress = () => toggleSelectedService(service.id)
    const isSelected = Boolean(selectedServices[service.id])

    let buttonStyles = {
      icon: {
        color: 'white',
        name: 'plus',
        type: 'antdesign',
      },
      title: 'Add to cart',
    }

    if (isSelected) {
      buttonStyles.icon = {
        color: 'white',
        name: 'check',
        type: 'antdesign',
      }
    }

    return (
      <PricingCard
        color={isSelected ? colors.success : colors.primary}
        key={service.id}
        button={buttonStyles}
        info={[service.description]}
        onButtonPress={handlePress}
        price={humanizePrice(service.price)}
        title={service.name} />
    )
  }, [
    selectedServices,
    toggleSelectedService,
  ])

  return (
    <Layout navigation={navigation}>
      <ScrollView style={styles.container}>
        <Text h2>{'Schedule Service'}</Text>

        {services.map(mapServices)}

        <Button
          disabled={!Object.keys(selectedServices).length}
          onPress={handleReviewService}
          style={{ marginBottom: 50 }}
          title="Review Service" />
      </ScrollView>

      <Dialog isVisible={isCreatingOrder}>
        <Dialog.Loading />
      </Dialog>
    </Layout>
  )
}
