import React, { useMemo, useRef } from 'react'
import {
  Animated,
  DevSettings,
  Platform,
  Pressable,
  TextStyle,
  ViewStyle,
} from 'react-native'
import { MMKV } from 'react-native-mmkv'
import { ScreenCornerRadius as screenRadius } from 'react-native-screen-corner-radius/src'

import { Text } from '../../solutions/chapter7/components/Text'
import { colors, fonts } from '../theme'

export const storage = new MMKV({ id: '@RNEssentials/training' })

export type AppModes = (typeof appModes)[number]['value']

const appModes = [
  { label: 'Assignment', value: 'assignment' },
  { label: 'Chapter 1', value: 'chapter1' },
  { label: 'Chapter 2', value: 'chapter2' },
  { label: 'Chapter 3', value: 'chapter3' },
  { label: 'Chapter 4', value: 'chapter4' },
  { label: 'Chapter 5', value: 'chapter5' },
  { label: 'Chapter 6', value: 'chapter6' },
  { label: 'Chapter 7', value: 'chapter7' },
] as const

export function setupTrainingAppModeSelector() {
  const activeAppMode =
    (storage.getString('appMode') as AppModes) || 'assignment'

  appModes.forEach(f => {
    const title = [
      '⚈ ',
      f.label,
      f.value !== 'assignment' && 'Solution',
      Platform.OS === 'android' ? false : ' ⚈',
    ]
      .filter(Boolean)
      .join(' ')

    DevSettings.addMenuItem(title, () => {
      storage.set('appMode', f.value)
      DevSettings.reload()
    })
  })

  return activeAppMode
}

export function TrainingOverlay({ appMode }: { appMode: AppModes }) {
  const opacity = useRef(new Animated.Value(1)).current

  const label = useMemo(
    () => appModes.find(f => f.value === appMode)?.label,
    [appMode],
  )

  function toggleOverlay() {
    // @ts-expect-error -- __getValue is private
    const nextValue = opacity.__getValue() === 1 ? 0 : 1

    Animated.timing(opacity, {
      toValue: nextValue,
      duration: 350,
      useNativeDriver: true,
    }).start()
  }

  if (appMode === 'assignment') return null
  if (!label) return null

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[$solutionOverlay, { opacity }]}>
      {Array.from({ length: 2 }).map((_, i) => (
        <Pressable onPress={toggleOverlay} key={i} style={$solutionWrapper}>
          <Text
            key={i}
            text={Array.from({ length: 6 }, () => label).join('       ')}
            preset="body"
            style={[$solutionLabel, { top: i === 0 ? -2 : 2 }]} // eslint-disable-line react-native/no-inline-styles
          />
        </Pressable>
      ))}
    </Animated.View>
  )
}

const $solutionOverlay: ViewStyle = {
  width: '100%',
  height: '100%',
  bottom: 0,
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  borderColor: colors.tint.accent,
  borderWidth: 4,
  justifyContent: 'space-between',
  borderRadius: screenRadius,
  overflow: 'hidden',
}

const $solutionWrapper: ViewStyle = {
  width: '100%',
  height: 16,
  backgroundColor: colors.tint.accent,
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
}

const $solutionLabel: TextStyle = {
  color: colors.text.overlay,
  fontSize: 12,
  lineHeight: 12,
  fontFamily: fonts.primary.bold,
}
