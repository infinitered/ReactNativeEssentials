import {useNavigation} from '@react-navigation/native'
import React, {useCallback, useEffect} from 'react'
import {SectionList, ViewStyle} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {Card} from '../../components/Card'
import {api} from '../../services/api'
import {useGlobalState} from '../../services/state'
import {colors, sizes} from '../../theme'
import {Empty} from '../../components/Empty'
import {Game, GamesSectionList} from '../../services/types'
import {Pill} from '../../components/Pill'

function parseGameData(rawData: Game[]): GamesSectionList {
  const initialValue: {[k: number]: Game[]} = {}
  const gameListMap = rawData.reduce((acc, curr) => {
    const year = curr.releaseDate.y
    if (acc[year]) {
      acc[year].push(curr)
    } else {
      acc[year] = [curr]
    }
    return acc
  }, initialValue)

  return Object.entries(gameListMap).map(([k, v]) => ({title: k, data: v}))
}

export const GamesListScreen = () => {
  const {bottom: paddingBottom} = useSafeAreaInsets()

  const navigation = useNavigation()

  const {setGames, games} = useGlobalState()

  const getGames = useCallback(async () => {
    const response = await api.getGames()

    if (response.ok) {
      setGames(parseGameData(response.data))
    }
  }, [setGames])

  useEffect(() => {
    getGames()
  }, [getGames])

  return (
    <SectionList
      sections={games}
      style={$list}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={[{paddingBottom}, $contentContainer]}
      ListEmptyComponent={<Empty />}
      initialNumToRender={6}
      maxToRenderPerBatch={20}
      windowSize={31}
      renderItem={({item}) => (
        <Card
          onPress={() => navigation.navigate('GameDetails', {gameId: item.id})}
          name={item.name}
          rating={item.totalRatingStars}
          releaseDate={item.releaseDate.human}
          imageUrl={item.cover.imageUrl}
        />
      )}
      renderSectionHeader={({section: {title}}) => <Pill text={title} />}
    />
  )
}

const $list: ViewStyle = {
  backgroundColor: colors.tokens.backgroundSurface100,
}

const $contentContainer: ViewStyle = {
  rowGap: sizes.spacing.lg,
  padding: sizes.spacing.md,
}
