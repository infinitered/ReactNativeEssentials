// import * as colorPrimitives from './tokens/colorPrimitives'
import * as colorBackgroundSemantics from './tokens/colorBackgroundSemantics'
import * as sizeBorderSemantics from './tokens/sizeBorderSemantics'
import * as sizeRadiusSemantics from './tokens/sizeRadiusSemantics'
import * as sizeSpacingSemantics from './tokens/sizeSpacingSemantics'

const colors = {
  // primitives: colorPrimitives,
  // tokens: colorTokens,
  background: colorBackgroundSemantics,
}

const sizes = {
  radius: sizeRadiusSemantics,
  border: sizeBorderSemantics,
  spacing: sizeSpacingSemantics,
}

export { colors, sizes }
export * from './fonts'
