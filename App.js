import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ThemeProvider } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { AppContextProvider } from './components/AppContext.js'
import { LoadingScreen } from './components/LoadingScreen.js'
import { HomeScreen } from './components/HomeScreen.js'
import { OrderConfirmationScreen } from './components/OrderConfirmationScreen.js'
import { SchedulingScreen } from './components/SchedulingScreen.js'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <AppContextProvider>
          <ThemeProvider>
            <Stack.Navigator initialRouteName="Loading">
              <Stack.Screen
                component={OrderConfirmationScreen}
                name="Confirm Order" />
              <Stack.Screen
                component={HomeScreen}
                name="Home"
                options={{
                  headerBackVisible: false,
                }} />
              <Stack.Screen
                component={SchedulingScreen}
                name="Scheduling" />
              <Stack.Screen
                component={LoadingScreen}
                name="Loading" />
            </Stack.Navigator>
          </ThemeProvider>
        </AppContextProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  )
}
