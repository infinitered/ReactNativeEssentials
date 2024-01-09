import 'react-native-url-polyfill/auto'
import {setupServer} from 'msw/native'
import {games} from './handlers/games'
import {game} from './handlers/game'

const server = setupServer(games, game)

export function setupMockServer(opts: {debug?: boolean} = {}) {
  try {
    if (opts.debug) {
      server.events.on('request:start', req => {
        console.log('MSW intercepted:', req.method, req.url)
      })
    }
    server.listen()
  } catch (error) {
    console.error(error)
  }
}
