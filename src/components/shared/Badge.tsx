import styled from '@emotion/styled'

import Text from '@shared/Text'
import { colors } from '@styles/colorPalette'

interface BadgeProps {
  label: string
}

function Badge({ label }: BadgeProps) {
  return (
    <Container>
      <Text typography="t7" color="white" bold={true}>
        {label}
      </Text>
    </Container>
  )
}

const Container = styled.div`
  padding: 2px 8px;
  border-radius: 12px;
  background-color: ${colors.blue};
`

export default Badge
