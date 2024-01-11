/**
 * @format
 */

import {AppRegistry} from 'react-native'
import {name as appName} from './app.json'
import {setupMockServer} from './msw'
import AppAssignment from './app/App'
import AppChapter6 from './solutions/chapter6/App'
import {setupAppModeSelector} from './shared/utils/trainingHelper'

const activeAppMode = setupAppModeSelector()
setupMockServer()

if (__DEV__) {
  import('./shared/utils/reactotronConfig').then(() =>
    console.log('Reactotron Configured'),
  )
}

const appFileRegistry = {
  assignment: AppAssignment,
  chapter1: AppChapter6,
  chapter2: AppChapter6,
  chapter3: AppChapter6,
  chapter4: AppChapter6,
  chapter5: AppChapter6,
  chapter6: AppChapter6,
}

const App = appFileRegistry[activeAppMode]

AppRegistry.registerComponent(appName, () => App)
