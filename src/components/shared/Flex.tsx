import { CSSProperties } from 'react'
import styled from '@emotion/styled'

interface FlexProps {
  direction?: CSSProperties['flexDirection']
  justify?: CSSProperties['justifyContent']
  align?: CSSProperties['alignItems']
}

const Flex = styled.div<FlexProps>(({ direction, justify, align }) => ({
  display: 'flex',
  flexDirection: direction,
  justifyContent: justify,
  alignItems: align,
}))

export default Flex
