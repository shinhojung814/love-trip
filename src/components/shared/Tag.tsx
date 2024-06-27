import styled from '@emotion/styled'

import { colors, Colors } from '@styles/colorPalette'

interface TagProps {
  backgroundColor?: string
  color?: string
}

const Tag = styled.span<TagProps>(
  ({ backgroundColor = colors.blue, color = colors.white }) => ({
    padding: '4px 5px',
    borderRadius: '2px',
    textAlign: 'center',
    fontSize: '11px',
    fontWeight: 'bold',
    backgroundColor:
      backgroundColor in colors
        ? colors[backgroundColor as Colors]
        : backgroundColor,
    color: color in colors ? colors[color as Colors] : color,
  }),
)

export default Tag
