import styled from '@emotion/styled'

import { colors } from '@styles/colorPalette'
import Text from '@shared/Text'
import Flex from '@shared/Flex'
import Button from '@shared/Button'
import Dimmed from '@shared/Dimmed'

interface AlertProps {
  open?: boolean
  title: React.ReactNode
  description?: React.ReactNode
  buttonLabel?: string
  onButtonClick: () => void
}

function Alert({
  open,
  title,
  description,
  buttonLabel = '확인',
  onButtonClick,
}: AlertProps) {
  if (open === false) {
    return null
  }

  return (
    <Dimmed>
      <AlertContainer>
        <Text
          display="block"
          typography="t4"
          bold={true}
          style={{ marginBottom: 6 }}
        >
          {title}
        </Text>
        {description ? <Text typography="t7">{description}</Text> : null}
        <Flex justify="flex-end">
          <Button
            onClick={onButtonClick}
            weak={true}
            style={{ marginTop: 12, border: 'none' }}
          >
            {buttonLabel}
          </Button>
        </Flex>
      </AlertContainer>
    </Dimmed>
  )
}

const AlertContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 320px;
  padding: 24px;
  box-sizing: border-box;
  background-color: ${colors.white};
  border-radius: 6px;
  overflow: hidden;
  z-index: var(--alert-zindex);
`

export default Alert
