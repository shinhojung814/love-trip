import styled from '@emotion/styled'

import { colors } from '@styles/colorPalette'

const Input = styled.input`
  padding: 0 16px;
  width: 100%;
  height: 48px;
  box-sizing: border-box;
  border: solid 1px ${colors.gray};
  border-radius: 6px;
  font-size: 15px;
  font-weight: 500;

  &:focus {
    outline: none;
    border-color: ${colors.blue};
  }

  &[aria-invalid='true'] {
    border-color: ${colors.red};
  }
`

export default Input
