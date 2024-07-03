import { forwardRef, SelectHTMLAttributes } from 'react'
import styled from '@emotion/styled'

import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'
import { colors } from '@styles/colorPalette'

export interface Option {
  label: string
  value: string | number | undefined
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  placeholder?: string
  options: Option[]
}

const BaseSelect = styled.select`
  height: 52px;
  padding: 0 16px;
  border: solid 1px ${colors.gray};
  border-radius: 6px;
  cursor: pointer;

  &:required:invalid {
    color: ${colors.gray700};
  }
`

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, options, placeholder, value, ...props },
  ref,
) {
  return (
    <Flex direction="column">
      {label ? (
        <Text
          display="inline-block"
          typography="t7"
          color="black"
          style={{ fontSize: 12 }}
        >
          {label}
        </Text>
      ) : null}
      <Spacing direction="vertical" size={8} />
      <BaseSelect ref={ref} required={true} value={value} {...props}>
        <option disabled={true} hidden={true} value="">
          {placeholder}
        </option>
        {options.map(({ label, value }) => (
          <option key={label} value={value}>
            {label}
          </option>
        ))}
      </BaseSelect>
    </Flex>
  )
})

export default Select
