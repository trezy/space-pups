import {
  useCallback,
  useMemo,
} from 'react'
import { View } from 'react-native'
import {
  Button,
  ListItem,
  Text,
} from 'react-native-elements'

import { humanizePrice } from '../helpers/humanizePrice.js'
import { useAppContext } from './AppContext.js'
import { styles } from '../styles.js'

export function OrderConfirmationScreen(props) {
  const {
    orderDetails,
    services,
  } = useAppContext()

  const orderServices = useMemo(() => {
    return services.filter(service => {
      return orderDetails.services.includes(service.id)
    })
  }, [
    orderDetails.services,
    services,
  ])

  const total = useMemo(() => {
    return orderDetails.discounts
      .reduce((accumulator, discountDetails) => {
        const reductionAmount = accumulator * discountDetails.modifier
        return accumulator - reductionAmount
      }, orderDetails.subtotal)
      .toFixed(2)
  }, [
    orderDetails.discounts,
    orderDetails.subtotal,
  ])

  const mapDiscounts = useCallback(discountDetails => (
    <ListItem>
      <ListItem.Content>
        <ListItem.Title>
          {discountDetails.name}
        </ListItem.Title>
      </ListItem.Content>

      <ListItem.Content right>
        <ListItem.Title
          style={{ color: 'green' }}
          right>
          {`-${humanizePrice((orderDetails.subtotal * discountDetails.modifier).toFixed(2))}`}
        </ListItem.Title>
      </ListItem.Content>
    </ListItem>
  ), [orderDetails.subtotal])

  const mapServices = useCallback(service => {
    return (
      <ListItem key={service.id} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>
            {service.name}
          </ListItem.Title>

          {/* <ListItem.Subtitle>{service.description}</ListItem.Subtitle> */}
        </ListItem.Content>

        <ListItem.Content right>
          <ListItem.Title right>
            {humanizePrice(service.price)}
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
    )
  }, [])

  return (
    <View style={styles.container}>
      <View>
        {orderServices.map(mapServices)}

        <ListItem>
          <ListItem.Content>
            <ListItem.Title>
              <Text style={{ fontWeight: 'bold' }}>
                {'Subtotal'}
              </Text>
            </ListItem.Title>
          </ListItem.Content>

          <ListItem.Content right>
            <ListItem.Title right>
              {humanizePrice(orderDetails.subtotal)}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>

        {Boolean(orderDetails.discounts?.length) && (
          <>
            <ListItem
              containerStyle={{
                alignItems: 'flex-start',
                marginTop: 10,
              }}>
              <ListItem.Content>
                <ListItem.Title>
                  <Text style={{ fontWeight: 'bold' }}>
                    {'Discounts'}
                  </Text>
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>

            {orderDetails.discounts.map(mapDiscounts)}
          </>
        )}

        <ListItem containerStyle={{
          alignItems: 'flex-start',
          marginTop: 10,
        }}>
          <ListItem.Content>
            <ListItem.Title>
              <Text style={{ fontWeight: 'bold' }}>
                {'Total'}
              </Text>
            </ListItem.Title>
          </ListItem.Content>

          <ListItem.Content right>
            <ListItem.Title right>
              {humanizePrice(total)}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>

        <Button
          style={{ marginTop: 10 }}
          title="Place order" />
      </View>
    </View>
  )
}
