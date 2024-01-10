import React, {useLayoutEffect, useState} from 'react'
import {
  DevSettings,
  Modal,
  ScrollView,
  TextStyle,
  ViewStyle,
} from 'react-native'
import {MMKV} from 'react-native-mmkv'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import Button from '../components/Button/solutions/chapter6'
import Text from '../components/Text/solutions/chapter1'
import {colors, sizes} from '../theme'

export const storage = new MMKV({id: '@RNEssentials/chapter'})

export type WorkingFiles = (typeof workingFiles)[number]['value']

const workingFiles = [
  {label: 'Go Back to Your App', value: 'main'},
  {label: 'Chapter 1 Solution', value: 'chapter1'},
  {label: 'Chapter 2 Solution', value: 'chapter2'},
  {label: 'Chapter 3 Solution', value: 'chapter3'},
  {label: 'Chapter 4 Solution', value: 'chapter4'},
  {label: 'Chapter 5 Solution', value: 'chapter5'},
  {label: 'Chapter 6 Solution', value: 'chapter6'},
] as const

export const activeFile =
  (storage.getString('activeFile') as WorkingFiles) || 'main'

export function TrainingHelper() {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const {bottom: paddingBottom} = useSafeAreaInsets()

  useLayoutEffect(() => {
    DevSettings.addMenuItem('Preview Chapter Solutions', () => {
      setIsModalVisible(true)
    })
  }, [])

  if (!isModalVisible) return null

  return (
    <Modal visible>
      <ScrollView
        style={$scrollview}
        contentContainerStyle={[$contentContainer, {paddingBottom}]}>
        <Text preset="display" style={$heading}>
          Chapter Solutions
        </Text>

        <Text preset="body" style={$description}>
          You can view the solutions for each chapter by using the buttons
          below.
        </Text>

        {workingFiles.map(f => (
          <Button
            key={f.value}
            text={f.label}
            icon={activeFile === f.value ? 'check' : undefined}
            style={[activeFile !== f.value && $button]}
            onPress={() => {
              storage.set('activeFile', f.value)
              DevSettings.reload()
            }}
          />
        ))}

        <Button
          text="Cancel"
          style={$cancelButton}
          onPress={() => setIsModalVisible(false)}
        />
      </ScrollView>
    </Modal>
  )
}

const $scrollview: ViewStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: colors.tokens.borderAccent,
}

const $contentContainer: ViewStyle = {
  flexGrow: 1,
  justifyContent: 'center',
  padding: sizes.spacing.md,
  rowGap: sizes.spacing.md,
}

const $heading: TextStyle = {
  color: colors.tokens.backgroundSurface100,
}

const $description: TextStyle = {
  color: colors.tokens.backgroundSurface100,
  marginBottom: sizes.spacing.md,
}

const $button: ViewStyle = {
  backgroundColor: colors.tokens.backgroundSurface100,
}

const $cancelButton: ViewStyle = {
  backgroundColor: colors.tokens.backgroundSurface200,
}
