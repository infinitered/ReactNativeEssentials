import React from 'react'
import { Switch as RNSwitch, View, ViewStyle } from 'react-native'

import { colors } from '../../../shared/theme'

interface SwitchProps {
  on: boolean
  onToggle: () => void
}

export const Switch = (props: SwitchProps) => {
  const { on, onToggle } = props
  return (
    <View style={$container}>
      <RNSwitch
        ios_backgroundColor={
          on ? colors.background.accent : colors.background.accentMuted
        }
        onValueChange={onToggle}
        thumbColor={on ? colors.background.brand : colors.background.accent}
        trackColor={{
          false: colors.background.accentMuted,
          true: colors.background.accent,
        }}
        value={on}
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
