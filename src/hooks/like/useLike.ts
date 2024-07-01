import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from 'react-query'

import { getLikes, toggleLike } from '@remote/like'
import useUser from '@hooks/auth/useUser'
import { Hotel } from '@models/hotels'
import { useAlertContext } from '@contexts/AlertContext'

function useLike() {
  const user = useUser()

  const client = useQueryClient()

  const navigate = useNavigate()

  const { open } = useAlertContext()

  const { data } = useQuery(
    ['likes'],
    () => getLikes({ userId: user?.uid as string }),
    {
      enabled: user != null,
    },
  )

  const { mutate } = useMutation(
    ({ hotel }: { hotel: Pick<Hotel, 'id' | 'name' | 'mainImageUrl'> }) => {
      if (user == null) {
        throw new Error('로그인이 필요한 기능입니다.')
      }

      return toggleLike({ userId: user.uid, hotel })
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['likes'])
      },
      onError: (e: Error) => {
        if (e.message === '로그인이 필요한 기능입니다.') {
          open({
            title: '로그인이 필요한 기능입니다.',
            onButtonClick: () => navigate('/signin'),
          })

          return
        }

        if (e.message === '알 수 없는 에러가 발생했습니다.') {
          open({
            title: '알 수 없는 에러가 발생했습니다.',
            onButtonClick: () => {},
          })

          return
        }
      },
    },
  )

  return { data, mutate }
}

export default useLike
