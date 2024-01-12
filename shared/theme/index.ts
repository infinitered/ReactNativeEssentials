import * as colorBackgroundSemantics from './tokens/colorBackgroundSemantics'
import * as colorBorderSemantics from './tokens/colorBorderSemantics'
import * as colorTextSemantics from './tokens/colorTextSemantics'
import * as colorTintSemantics from './tokens/colorTintSemantics'
import * as sizeBorderSemantics from './tokens/sizeBorderSemantics'
import * as sizeRadiusSemantics from './tokens/sizeRadiusSemantics'
import * as sizeSpacingSemantics from './tokens/sizeSpacingSemantics'

const colors = {
  background: colorBackgroundSemantics,
  text: colorTextSemantics,
  tint: colorTintSemantics,
  border: colorBorderSemantics,
}

const sizes = {
  radius: sizeRadiusSemantics,
  border: sizeBorderSemantics,
  spacing: sizeSpacingSemantics,
}

export { colors, sizes }
export * from './fonts'
