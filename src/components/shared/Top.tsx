import { css } from '@emotion/react'

import Flex from '@shared/Flex'
import Text from '@shared/Text'

interface TopProps {
  title: string
  subtitle: string | null
}

function Top({ title, subtitle }: TopProps) {
  return (
    <Flex direction="column" css={containerStyles}>
      <Text typography="t4" bold={true}>
        {title}
      </Text>
      <Text typography="t7">{subtitle}</Text>
    </Flex>
  )
}

const containerStyles = css`
  padding: 24px;
`

export default Top
