import {rest} from 'msw'
import {findGameById} from '../utils/prepareGameData'

export const game = rest.post(
  'https://api.retrogames.dev/games/:gameId',
  async (req, res, ctx) => {
    const gameItem = findGameById(Number(req.params.gameId))

    return res(ctx.status(200), ctx.json(gameItem))
  },
)
