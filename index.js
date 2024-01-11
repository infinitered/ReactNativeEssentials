/**
 * @format
 */

import {AppRegistry} from 'react-native'
import {name as appName} from './app.json'
import {setupMockServer} from './msw'
import AppAssignment from './app/App'
import AppChapter7 from './solutions/chapter7/App'
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
  chapter1: AppChapter7,
  chapter2: AppChapter7,
  chapter3: AppChapter7,
  chapter4: AppChapter7,
  chapter5: AppChapter7,
  chapter6: AppChapter7,
  chapter7: AppChapter7,
}

const App = appFileRegistry[activeAppMode]

AppRegistry.registerComponent(appName, () => App)
