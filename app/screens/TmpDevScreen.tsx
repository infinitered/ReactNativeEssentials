import React from 'react';
import {ScrollView, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Button} from '../components/Button';
import {Text} from '../components/Text';
import {colors, sizes} from '../theme';

const text = 'Thank you, Mario! But our princess is in another castle!';
const button = 'Get over here!';

export function TmpDevScreen() {
  const {bottom} = useSafeAreaInsets();

  return (
    <ScrollView
      style={$scrollView}
      contentContainerStyle={[$contentContainerStyle, {paddingBottom: bottom}]}>
      <Button text={button} icon="sun" />
      <Button text={button} style={$button} />
      <Text preset="display" text={text} />
      <Text preset="headline1" text={text} />
      <Text preset="headline2" text={text} />
      <Text preset="title1" text={text} />
      <Text preset="title2" text={text} />
      <Text preset="label1" text={text} />
      <Text preset="label2" text={text} />
      <Text preset="body" text={text} />
    </ScrollView>
  );
}

const $scrollView: ViewStyle = {
  backgroundColor: colors.tokens.backgroundSurface100,
};

const $contentContainerStyle: ViewStyle = {
  rowGap: sizes.spacing.md,
  padding: sizes.spacing.md,
};

const $button: ViewStyle = {
  backgroundColor: colors.tokens.backgroundSurface100,
};