import { css } from '@emotion/react'
import styled from '@emotion/styled'

import {
  ButtonColor,
  buttonColorMap,
  buttonWeakMap,
  ButtonSize,
  buttonSizeMap,
} from '@styles/button'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'

interface ButtonProps {
  color?: ButtonColor
  size?: ButtonSize
  weak?: boolean
  full?: boolean
  disabled?: boolean
}

const BaseButton = styled.button<ButtonProps>(
  {
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  ({ color = 'primary', weak }) =>
    weak ? buttonWeakMap[color] : buttonColorMap[color],
  ({ size = 'small' }) => buttonSizeMap[size],
  ({ full }) =>
    full
      ? css`
          display: block;
          width: 100%;
          border-radius: 6px;
        `
      : undefined,
  ({ disabled }) =>
    disabled
      ? css`
          opacity: 0.25;
          cursor: initial;
        `
      : undefined,
)

function ButtonGroup({
  title,
  children,
}: {
  title?: string
  children: React.ReactNode
}) {
  return (
    <Flex direction="column">
      {title != null ? (
        <>
          <Text typography="t6" bold={true}>
            {title}
          </Text>
          <Spacing direction="vertical" size={8} />
        </>
      ) : null}
      <Flex css={buttonGroupStyles}>{children}</Flex>
    </Flex>
  )
}

const buttonGroupStyles = css`
  flex-wrap: wrap;
  gap: 10px;

  & button {
    flex: 1;
  }
`

const Button = BaseButton as typeof BaseButton & {
  Group: typeof ButtonGroup
}

Button.Group = ButtonGroup

export default Button
