import {useFonts} from 'expo-font'
import React, {useEffect, useState} from 'react'
import BootSplash from 'react-native-bootsplash'
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context'
import {AppNavigator} from './navigators/AppNavigator'
import {GlobalStateProvider} from './services/state'
import {customFontsToLoad} from '../shared/theme'

const App = (): React.JSX.Element | null => {
  const [areFontsLoaded] = useFonts(customFontsToLoad)
  const [isNavigationReady, setIsNavigationReady] = useState(false)

  const isAppReady = areFontsLoaded && isNavigationReady

  useEffect(() => {
    if (isAppReady) {
      BootSplash.hide({fade: true})
    }
  }, [isAppReady])

  if (!areFontsLoaded) return null

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GlobalStateProvider>
        <AppNavigator onReady={() => setIsNavigationReady(true)} />
      </GlobalStateProvider>
    </SafeAreaProvider>
  )
}

export default App
