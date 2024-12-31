import React, { useCallback, useState } from 'react'
import { TextInput, View } from 'react-native'
import type { TextStyle, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { fonts, sizes } from '../../../shared/theme'
import { Button } from '../components/Button'
import { Text } from '../components/Text'
import type { ScreenProps } from '../navigators/AppNavigator'
import { useGlobalState } from '../services/state'
import { useAppTheme } from '../services/theme'
import type { ThemedStyle } from '../services/theme'

export const ReviewScreen = ({ navigation, route }: ScreenProps<'Review'>) => {
  const { theme: { colors }, themed } = useAppTheme()
  const { top: paddingTop } = useSafeAreaInsets()
  const [value, setValue] = useState('')

  const state = useGlobalState()
  const { gameId } = route.params

  const backToPrevious = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack()
    } else {
      navigation.navigate('GamesList')
    }
  }, [navigation])

  const submitReview = useCallback(() => {
    if (value) {
      state.appendReview(gameId, value)
      backToPrevious()
    }
  }, [backToPrevious, gameId, value, state])

  return (
    <View style={themed($modal)}>
      <View style={[themed($container), { paddingTop }]}>
        <Text style={$heading} preset="headline2" text="Write a Review" />
        <View style={themed($textArea)}>
          <TextInput
            style={themed($textInput)}
            placeholder="Type your reivew..."
            multiline
            value={value}
            onChangeText={setValue}
            placeholderTextColor={colors.text.baseMuted}
          />
        </View>
        <View style={$formActions}>
          <Button text="Submit Review" onPress={submitReview} />
          <Button
            text="Close"
            icon="x"
            style={themed($secondaryButton)}
            onPress={backToPrevious}
          />
        </View>
      </View>
    </View>
  )
}

const $modal: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.manipulators.changeHexAlpha(
    colors.background.brand,
    75,
  ),
})

const $container: ThemedStyle<ViewStyle> = ({ colors }) => ({
  padding: sizes.spacing.md,
  backgroundColor: colors.background.primary,
  borderColor: colors.border.base,
  borderWidth: sizes.border.sm,
  borderTopWidth: 0,
  paddingBottom: sizes.spacing.md,
  borderBottomLeftRadius: sizes.spacing.lg,
  borderBottomRightRadius: sizes.spacing.lg,
})

const $heading: TextStyle = {
  marginVertical: sizes.spacing.md,
  textAlign: 'center',
}

const $textArea: ThemedStyle<ViewStyle> = ({ colors }) => ({
  borderColor: colors.border.base,
  borderWidth: sizes.border.sm,
  padding: sizes.spacing.sm,
  borderRadius: sizes.spacing.md,
  marginBottom: sizes.spacing.lg,
})

const $textInput: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontFamily: fonts.primary.regular,
  color: colors.text.base,
  borderColor: colors.border.base,
  height: 84,
  overflow: 'scroll',
  textAlignVertical: 'top',
})

const $formActions: ViewStyle = {
  flexDirection: 'column',
  gap: sizes.spacing.md,
  marginTop: sizes.spacing.md,
}

const $secondaryButton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.background.primary,
})