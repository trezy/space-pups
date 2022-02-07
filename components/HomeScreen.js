import { View } from 'react-native'
import { Text } from 'react-native-elements'

import { Layout } from './Layout.js'
import { styles } from '../styles.js'

export function HomeScreen(props) {
  const { navigation } = props

  return (
    <Layout navigation={navigation}>
      <View style={styles.hero}>
        <Text>{'Welcome to'}</Text>
        <Text h1>{'🚀 Space Pups'}</Text>
      </View>
    </Layout>
  )
}
