import styled from '@emotion/styled'

interface SpacingProps {
  direction?: 'vertical' | 'horizontal'
  size: number
}

const Spacing = styled.div<SpacingProps>`
  ${({ direction = 'vertical', size }) =>
    direction === 'vertical'
      ? `
    height: ${size}px;`
      : `
    width: ${size}px;
    `}
`

export default Spacing
