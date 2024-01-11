import React, {useEffect} from 'react'
import BootSplash from 'react-native-bootsplash'
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context'
import {GamesListScreen} from './screens/GamesListScreen'

const App = (): React.JSX.Element | null => {
  const isAppReady = true

  useEffect(() => {
    BootSplash.hide({fade: true})
  }, [isAppReady])

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GamesListScreen />
    </SafeAreaProvider>
  )
}

export default App
