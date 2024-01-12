import React from 'react'
import { Switch as RNSwitch, View, ViewStyle } from 'react-native'

import { colors } from '../../../shared/theme'

interface SwitchProps {
  isEnabled: boolean
  toggleSwitch: () => void
}

export const Switch = (props: SwitchProps) => {
  const { isEnabled, toggleSwitch } = props
  return (
    <View style={$container}>
      <RNSwitch
        ios_backgroundColor={
          isEnabled ? colors.background.accent : colors.background.accentMuted
        }
        onValueChange={toggleSwitch}
        thumbColor={
          isEnabled ? colors.background.brand : colors.background.accent
        }
        trackColor={{
          false: colors.background.accentMuted,
          true: colors.background.accent,
        }}
        value={isEnabled}
      />
    </View>
  )
}

const $container: ViewStyle = {
  alignItems: 'center',
  height: 31,
  justifyContent: 'center',
  width: 51,
}
