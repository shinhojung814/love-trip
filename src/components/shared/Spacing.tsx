import styled from '@emotion/styled'

import { Colors, colors } from '@styles/colorPalette'

interface SpacingProps {
  direction?: 'vertical' | 'horizontal'
  size: number
  backgroundColor?: Colors
}

const Spacing = styled.div<SpacingProps>`
  ${({ direction = 'vertical', size }) =>
    direction === 'vertical'
      ? `
    height: ${size}px;`
      : `
    width: ${size}px;
    `}

  ${({ backgroundColor }) =>
    backgroundColor && `background-color: ${colors[backgroundColor]};`}
`

export default Spacing
