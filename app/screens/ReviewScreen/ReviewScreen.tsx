import React, {useCallback, useState} from 'react'
import {Text} from '../../components/Text'
import {TextInput, TextStyle, View, ViewStyle} from 'react-native'
import {Button} from '../../components/Button'
import {colors, fonts, sizes} from '../../theme'
import {useGlobalState} from '../../services/state'
import {ScreenProps} from '../../navigators/AppNavigator'

export const ReviewScreen = ({navigation, route}: ScreenProps<'Review'>) => {
  const [value, setValue] = useState('')

  const state = useGlobalState()
  const {gameId} = route.params

  const backToPrevious = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack()
    } else {
      navigation.navigate('GamesList')
    }
  }, [navigation])

  const submitReview = useCallback(() => {
    console.log({input: value})
    if (value) {
      state.appendReview(gameId, value)
      backToPrevious()
    }
  }, [backToPrevious, gameId, value, state])

  return (
    <View style={$container}>
      <Text style={$heading} preset="headline2" text="Write a Review" />
      <View style={$textArea}>
        <TextInput
          style={$textInput}
          placeholder="Type your reivew..."
          multiline
          value={value}
          onChangeText={setValue}
        />
      </View>
      <View style={$formActions}>
        <Button text="Submit Review" onPress={submitReview} />
        <Button
          text="Close"
          icon="x"
          style={$secondaryButton}
          onPress={backToPrevious}
        />
      </View>
    </View>
  )
}

const $container: ViewStyle = {
  padding: sizes.spacing.md,
}

const $heading: TextStyle = {
  marginBottom: sizes.spacing.md,
  textAlign: 'center',
}

const $textArea: ViewStyle = {
  borderColor: colors.tokens.textBase,
  borderWidth: 2,
  padding: sizes.spacing.sm,
  borderRadius: sizes.spacing.md,
  marginBottom: sizes.spacing.lg,
}

const $textInput: TextStyle = {
  fontFamily: fonts.primary.regular,
  color: colors.tokens.textBase,
  borderColor: colors.tokens.textBase,
  height: 84,
  overflow: 'scroll',
}

const $formActions: ViewStyle = {
  flexDirection: 'column',
  gap: sizes.spacing.md,
  marginTop: sizes.spacing.md,
}

const $secondaryButton: ViewStyle = {
  backgroundColor: colors.tokens.backgroundSurface100,
}
