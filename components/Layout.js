import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native'
import { FAB } from 'react-native-elements'

export function Layout(props) {
  const { children } = props

  const navigation = useNavigation()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {children}

      <FAB
        onPress={() => navigation.navigate('Scheduling')}
        placement="right"
        title="Schedule"
        icon={{
          color: 'white',
          name: 'calendar',
          type: 'antdesign',
        }} />
    </SafeAreaView>
  )
}
