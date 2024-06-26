import { createPortal } from 'react-dom'
import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'

import Button from '@shared/Button'
import { colors } from '@styles/colorPalette'

interface FixedBottomButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
}

function FixedBottomButton({
  label,
  onClick,
  disabled,
}: FixedBottomButtonProps) {
  const $portal_root = document.getElementById('root-portal')

  if ($portal_root == null) {
    return null
  }

  return createPortal(
    <Container>
      <Button
        size="medium"
        full={true}
        onClick={onClick}
        disabled={disabled}
        css={buttonStyles}
      >
        {label}
      </Button>
    </Container>,
    $portal_root,
  )
}

const slideAnimation = keyframes`
  to {
    transform: translateY(0);
  }
`

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px 10px 8px;
  background-color: ${colors.white};
  transform: translateY(100%);
  animation: ${slideAnimation} 0.5s ease-in-out forwards;
`

const buttonStyles = css`
  border-radius: 8px;
`

export default FixedBottomButton
