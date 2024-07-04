import { Fragment, useCallback } from 'react'
import { useForm } from 'react-hook-form'

import Text from '@shared/Text'
import Select from '@shared/Select'
import Spacing from '@shared/Spacing'
import TextField from '@shared/TextField'
import FixedBottomButton from '@shared/FixedBottomButton'
import { Hotel, ReservationForm } from '@models/hotel'

type FormData = {
  [key: string]: string
}

function Form({
  forms,
  onSubmit,
  buttonLabel,
}: {
  forms: Hotel['forms']
  onSubmit: (formValues: FormData) => void
  buttonLabel: string
}) {
  const { register, formState, handleSubmit } = useForm<FormData>({
    mode: 'onBlur',
  })

  const component = useCallback(
    (form: ReservationForm) => {
      if (form.type === 'TEXT_FIELD') {
        return (
          <>
            <TextField
              label={form.label}
              helpMessage={
                (formState.errors[form.id]?.message as string) ||
                form.helpMessage
              }
              hasError={formState.errors[form.id] != null}
              {...register(form.id, {
                required: form.required,
                pattern: VALIDATION_MESSAGE_MAP[form.id],
              })}
            />
          </>
        )
      } else if (form.type === 'SELECT') {
        return (
          <Select
            label={form.label}
            options={form.options}
            // hasError={formState.errors[form.id] != null}
            {...register(form.id, {
              required: form.required,
              pattern: VALIDATION_MESSAGE_MAP[form.id],
            })}
          />
        )
      } else {
        return null
      }
    },
    [register, formState.errors],
  )

  return (
    <div style={{ padding: 24 }}>
      <Text bold={true}>예약 정보</Text>
      <Spacing direction="vertical" size={16} />
      <form>
        {forms.map((form) => {
          return (
            <Fragment key={form.id}>
              {component(form)}
              <Spacing direction="vertical" size={12} />
            </Fragment>
          )
        })}
      </form>
      <Spacing direction="vertical" size={60} />
      <FixedBottomButton label={buttonLabel} onClick={handleSubmit(onSubmit)} />
    </div>
  )
}

const VALIDATION_MESSAGE_MAP: {
  [key: string]: { value: RegExp; message: string }
} = {
  name: {
    value: /^[가-힣]+$/,
    message: '입력한 이름을 확인해주세요.',
  },
  email: {
    value: /^[a-zA-Z0-9+-.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    message: '입력한 이메일을 확인해주세요',
  },
  phone: {
    value: /^\d+$/,
    message: '입력한 전화 번호를 확인해주세요.',
  },
}

export default Form
