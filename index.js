/**
 * @format
 */

import {AppRegistry} from 'react-native'
import {name as appName} from './app.json'
import App from './app/App'
import {setupMockServer} from './msw'

setupMockServer()

if (__DEV__) {
  import('./shared/utils/reactotronConfig').then(() =>
    console.log('Reactotron Configured'),
  )
}

AppRegistry.registerComponent(appName, () => App)
