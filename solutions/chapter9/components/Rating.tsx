import React from 'react'
import type { TextStyle, ViewStyle } from 'react-native'
import { View } from 'react-native'

import { sizes } from '../../../shared/theme'
import { isRTL, Trans } from '../services/i18n'
import { useAppTheme } from '../services/theme'
import { Icon } from './Icon'
import { Text } from './Text'

interface RatingProps {
  rating: number
  ratingsCount?: number
}

export const Rating = ({ rating, ratingsCount }: RatingProps) => {
  const {
    theme: { colors },
  } = useAppTheme()

  return (
    <View style={$container}>
      <Text style={$label} preset="label2">
        <Trans
          i18nKey="gamesListScreen:rating"
          components={{
            Ratings:
              ratingsCount !== undefined ? (
                <Text
                  preset="label2"
                  tx="gamesListScreen:ratings"
                  txOptions={{ count: ratingsCount }}
                />
              ) : (
                <></>
              ),
          }}
        />
      </Text>
      {Array.from({ length: rating }).map((_, i) => (
        <Icon color={colors.tint.accent} key={i} name="star" />
      ))}
    </View>
  )
}

const $container: ViewStyle = {
  flexDirection: isRTL ? 'row-reverse' : 'row',
  columnGap: sizes.spacing.xs,
  alignItems: 'center',
}

const $label: TextStyle = {
  bottom: -2,
  minHeight: 24,
  height: 24,
}
