import { CSSProperties } from 'react'
import styled from '@emotion/styled'

import { colors, Colors } from '@styles/colorPalette'
import { typographyMap, Typography } from '@styles/typography'

interface TextProps {
  display?: CSSProperties['display']
  textAlign?: CSSProperties['textAlign']
  fontWeight?: CSSProperties['fontWeight']
  typography?: Typography
  color?: Colors
  bold?: boolean
}

const Text = styled.span<TextProps>(
  ({ display, textAlign, fontWeight, color = 'black', bold }) => ({
    display,
    textAlign,
    color: colors[color],
    fontWeight: bold ? 'bold' : fontWeight,
  }),
  ({ typography = 't5' }) => typographyMap[typography],
)

export default Text
